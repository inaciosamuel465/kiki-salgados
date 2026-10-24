import { CONFIG, CATEGORIES, PRODUCTS, KITS_ORCAMENTO } from './data.js';

// Utilitários de Formatação
export const formatBRL = (cents) => {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Gerador de Link WhatsApp
export const createWhatsAppUrl = (message) => {
  const cleanPhone = CONFIG.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

// Gerenciador do Carrinho com LocalStorage
class CartManager {
  constructor() {
    this.cart = {};
    this.listeners = [];
    this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem('kiki_salgados_cart');
      if (saved) {
        this.cart = JSON.parse(saved);
        // Limpar itens que não existam mais no catálogo
        Object.keys(this.cart).forEach(id => {
          if (!PRODUCTS.find(p => p.id === id) || this.cart[id] <= 0) {
            delete this.cart[id];
          }
        });
      }
    } catch (e) {
      this.cart = {};
    }
  }

  save() {
    try {
      localStorage.setItem('kiki_salgados_cart', JSON.stringify(this.cart));
    } catch (e) {}
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.getState());
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  add(productId, quantity = 1) {
    this.cart[productId] = (this.cart[productId] || 0) + quantity;
    this.save();
  }

  set(productId, quantity) {
    if (quantity <= 0) {
      delete this.cart[productId];
    } else {
      this.cart[productId] = quantity;
    }
    this.save();
  }

  remove(productId) {
    delete this.cart[productId];
    this.save();
  }

  clear() {
    this.cart = {};
    this.save();
  }

  getState() {
    const items = Object.entries(this.cart).map(([id, qty]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return {
        product,
        qty,
        subtotal: product ? product.price * qty : 0
      };
    }).filter(i => Boolean(i.product));

    const totalQty = items.reduce((acc, curr) => acc + curr.qty, 0);
    const totalPrice = items.reduce((acc, curr) => acc + curr.subtotal, 0);

    return {
      items,
      totalQty,
      totalPrice
    };
  }
}

export const cart = new CartManager();

// Notificações Toast
export function showToast(message) {
  let toastEl = document.getElementById('toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'toast';
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('show');
  
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}
