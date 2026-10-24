import { CONFIG, CATEGORIES, PRODUCTS, KITS_ORCAMENTO } from './data.js';
import { cart, formatBRL, createWhatsAppUrl, showToast } from './cart.js';

// Estado local da UI
let currentCategory = 'Todos';
let kitDraft = {}; // Para o Monte seu Kit
let cartDrawerOpen = false;
let checkoutStep = 'cart'; // 'cart' ou 'checkout'

// Formulário de finalização
let customerForm = {
  name: '',
  phone: '',
  serviceType: 'Retirada',
  address: '',
  date: '',
  time: '',
  notes: ''
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderFeatured();
  renderCategories();
  renderProducts();
  renderKitBuilder();
  renderKitsCards();
  initOrderForm();
  initCartDrawer();
  initContact();
  
  // Ouvir mudanças no carrinho
  cart.subscribe(updateCartBadge);
});

// 1. Header & Mobile Menu
function initHeader() {
  const burgerBtn = document.getElementById('burger-btn');
  const navLinks = document.getElementById('nav-links');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Floating WhatsApp
  const floatingWa = document.getElementById('floating-whatsapp');
  if (floatingWa) {
    floatingWa.href = createWhatsAppUrl(`Olá, Kiki Salgados! Gostaria de informações sobre o cardápio e encomendas.`);
  }
}

function updateCartBadge(state) {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = state.totalQty;
  }
}

// 2. Destaques
function renderFeatured() {
  const container = document.getElementById('featured-grid');
  if (!container) return;

  const featuredProducts = PRODUCTS.filter(p => CONFIG.featured.includes(p.id));
  container.innerHTML = featuredProducts.map(product => createProductCardHtml(product)).join('');
  attachProductEvents(container);
}

// 3. Cardápio Completo & Categorias
function renderCategories() {
  const bar = document.getElementById('categories-bar');
  if (!bar) return;

  bar.innerHTML = CATEGORIES.map(cat => `
    <button class="category-chip ${cat === currentCategory ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  bar.querySelectorAll('.category-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = currentCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === currentCategory);

  container.innerHTML = filtered.map(product => createProductCardHtml(product)).join('');
  attachProductEvents(container);
}

function createProductCardHtml(p) {
  const defaultQty = CONFIG.defaultQty;
  return `
    <article class="product-card" id="card-${p.id}">
      <div class="product-media">
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price">${formatBRL(p.price)}</span>
            <span class="product-price-unit">por unidade</span>
          </div>
          <div class="stepper">
            <button class="stepper-btn qty-minus" data-id="${p.id}" aria-label="Diminuir">−</button>
            <span class="stepper-value" id="qty-${p.id}">${defaultQty}</span>
            <button class="stepper-btn qty-plus" data-id="${p.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button class="btn btn-primary btn-sm add-cart-btn" data-id="${p.id}" style="margin-top:14px; width:100%;">
          🛒 Adicionar ao Pedido
        </button>
      </div>
    </article>
  `;
}

function attachProductEvents(parent) {
  parent.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const el = document.getElementById(`qty-${id}`);
      if (el) {
        let val = parseInt(el.textContent, 10) || CONFIG.defaultQty;
        el.textContent = val + 5;
      }
    });
  });

  parent.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const el = document.getElementById(`qty-${id}`);
      if (el) {
        let val = parseInt(el.textContent, 10) || CONFIG.defaultQty;
        if (val > 1) {
          el.textContent = Math.max(1, val - 5);
        }
      }
    });
  });

  parent.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const el = document.getElementById(`qty-${id}`);
      const qty = parseInt(el ? el.textContent : CONFIG.defaultQty, 10);
      cart.add(id, qty);
      showToast(`${qty}x adicionados ao carrinho!`);
    });
  });
}

// 4. Monte seu Kit (Calculadora Interativa)
function renderKitBuilder() {
  const list = document.getElementById('builder-list');
  const presetsContainer = document.getElementById('presets-pills');
  if (!list) return;

  // Render presets
  if (presetsContainer) {
    presetsContainer.innerHTML = CONFIG.presets.map(n => `
      <button class="preset-pill" data-preset="${n}">${n} salgados</button>
    `).join('');

    presetsContainer.querySelectorAll('.preset-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        applyPreset(parseInt(btn.dataset.preset, 10));
      });
    });
  }

  // Render items
  list.innerHTML = PRODUCTS.map(p => `
    <div class="builder-item">
      <img src="${p.image}" alt="${p.name}" class="builder-item-thumb">
      <div class="builder-item-info">
        <h4 class="builder-item-name">${p.name}</h4>
        <span class="builder-item-price">${formatBRL(p.price)} / un.</span>
      </div>
      <div class="stepper" style="background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.15)">
        <button class="stepper-btn b-minus" data-id="${p.id}" style="background:#374151;color:#fff">−</button>
        <span class="stepper-value" id="b-qty-${p.id}" style="color:#fff">${kitDraft[p.id] || 0}</span>
        <button class="stepper-btn b-plus" data-id="${p.id}" style="background:#374151;color:#fff">+</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.b-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      kitDraft[id] = (kitDraft[id] || 0) + 5;
      updateKitBuilder();
    });
  });

  list.querySelectorAll('.b-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (kitDraft[id] > 0) {
        kitDraft[id] = Math.max(0, kitDraft[id] - 5);
        if (kitDraft[id] === 0) delete kitDraft[id];
        updateKitBuilder();
      }
    });
  });

  const clearBtn = document.getElementById('kit-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      kitDraft = {};
      updateKitBuilder();
    });
  }

  const addKitBtn = document.getElementById('kit-add-cart-btn');
  if (addKitBtn) {
    addKitBtn.addEventListener('click', () => {
      const total = Object.values(kitDraft).reduce((a, b) => a + b, 0);
      if (total === 0) {
        showToast('Escolha a quantidade de salgados primeiro!');
        return;
      }
      Object.entries(kitDraft).forEach(([id, qty]) => {
        cart.add(id, qty);
      });
      kitDraft = {};
      updateKitBuilder();
      showToast('Kit personalizado adicionado ao carrinho!');
      openCartDrawer();
    });
  }

  updateKitBuilder();
}

function applyPreset(totalSalgados) {
  kitDraft = {};
  const flavorsCount = PRODUCTS.length;
  const basePerFlavor = Math.floor(totalSalgados / flavorsCount);
  let remainder = totalSalgados % flavorsCount;

  PRODUCTS.forEach((p, idx) => {
    const qty = basePerFlavor + (idx < remainder ? 1 : 0);
    if (qty > 0) {
      kitDraft[p.id] = qty;
    }
  });

  updateKitBuilder();
}

function updateKitBuilder() {
  PRODUCTS.forEach(p => {
    const el = document.getElementById(`b-qty-${p.id}`);
    if (el) el.textContent = kitDraft[p.id] || 0;
  });

  const totalQty = Object.values(kitDraft).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(kitDraft).reduce((acc, [id, qty]) => {
    const prod = PRODUCTS.find(p => p.id === id);
    return acc + (prod ? prod.price * qty : 0);
  }, 0);

  const qtyEl = document.getElementById('kit-total-qty');
  const priceEl = document.getElementById('kit-total-price');

  if (qtyEl) qtyEl.textContent = totalQty;
  if (priceEl) priceEl.textContent = formatBRL(totalPrice);
}

// 5. Kits e Combos
function renderKitsCards() {
  const container = document.getElementById('kits-cards-grid');
  if (!container) return;

  container.innerHTML = KITS_ORCAMENTO.map(kit => `
    <article class="kit-card">
      <span class="kit-badge">${kit.badge}</span>
      <div class="kit-icon">${kit.icon}</div>
      <h3 class="kit-title">${kit.title}</h3>
      <div class="kit-qty">${kit.qty}</div>
      <p class="kit-desc">${kit.desc}</p>
      <button class="btn btn-outline btn-sm request-kit-btn" data-kit="${kit.title}">
        Solicitar Orçamento
      </button>
    </article>
  `).join('');

  container.querySelectorAll('.request-kit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const kitTitle = btn.dataset.kit;
      const typeSelect = document.getElementById('form-event-type');
      if (typeSelect) {
        typeSelect.value = kitTitle;
      }
      const section = document.getElementById('encomendas');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// 6. Formulário de Orçamento para Festas
function initOrderForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('quote-name').value.trim();
    const eventType = document.getElementById('form-event-type').value;
    const qty = document.getElementById('quote-qty').value;
    const date = document.getElementById('quote-date').value;
    const notes = document.getElementById('quote-notes').value.trim();

    if (!name || !qty) {
      showToast('Por favor, informe seu nome e a quantidade desejada.');
      return;
    }

    const formattedDate = date ? date.split('-').reverse().join('/') : 'A combinar';

    const message = 
`🥟 *SOLICITAÇÃO DE ORÇAMENTO — KIKI SALGADOS* 🥟

*Nome:* ${name}
*Evento:* ${eventType}
*Quantidade estimada:* ${qty} salgados
*Data desejada:* ${formattedDate}
*Detalhes & Observações:* ${notes || 'Não informado'}

(Gostaria de consultar disponibilidade e condições para meu evento!)`;

    window.open(createWhatsAppUrl(message), '_blank', 'noopener');
  });
}

// 7. Drawer do Carrinho e Finalização via WhatsApp
function initCartDrawer() {
  const openBtn = document.getElementById('cart-toggle-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

  if (openBtn) openBtn.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  cart.subscribe(() => {
    if (cartDrawerOpen) renderCartBody();
  });
}

function openCartDrawer() {
  cartDrawerOpen = true;
  checkoutStep = 'cart';
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  renderCartBody();
}

function closeCartDrawer() {
  cartDrawerOpen = false;
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function renderCartBody() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  const title = document.getElementById('cart-drawer-title');
  if (!body || !footer) return;

  const state = cart.getState();

  if (checkoutStep === 'cart') {
    if (title) title.textContent = 'Seu Pedido';

    if (state.items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🥟</div>
          <p>Seu carrinho está vazio.<br>Escolha seus salgados favoritos!</p>
          <button class="btn btn-primary" id="btn-explore-menu">Ver Cardápio</button>
        </div>
      `;
      footer.style.display = 'none';

      document.getElementById('btn-explore-menu')?.addEventListener('click', () => {
        closeCartDrawer();
        document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    footer.style.display = 'flex';
    body.innerHTML = state.items.map(item => `
      <div class="cart-item">
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.product.name}</h4>
          <span class="cart-item-sub">${formatBRL(item.product.price)} × ${item.qty} un.</span>
        </div>
        <div class="stepper" style="transform:scale(0.85); transform-origin:right center;">
          <button class="stepper-btn c-minus" data-id="${item.product.id}">−</button>
          <span class="stepper-value">${item.qty}</span>
          <button class="stepper-btn c-plus" data-id="${item.product.id}">+</button>
        </div>
        <span class="cart-item-total">${formatBRL(item.subtotal)}</span>
        <button class="cart-item-remove" data-id="${item.product.id}" aria-label="Remover">✕</button>
      </div>
    `).join('');

    footer.innerHTML = `
      <div class="cart-total-row">
        <span class="cart-total-label">Total (${state.totalQty} salgados):</span>
        <span class="cart-total-value">${formatBRL(state.totalPrice)}</span>
      </div>
      <button class="btn btn-primary btn-lg" id="btn-proceed-checkout" style="width:100%;">
        Avançar para Envio ➜
      </button>
      <button class="btn btn-outline btn-sm" id="btn-continue-shopping" style="width:100%;">
        Adicionar mais itens
      </button>
    `;

    body.querySelectorAll('.c-plus').forEach(btn => {
      btn.addEventListener('click', () => cart.add(btn.dataset.id, 1));
    });
    body.querySelectorAll('.c-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const curr = state.items.find(i => i.product.id === btn.dataset.id);
        if (curr) cart.set(btn.dataset.id, curr.qty - 1);
      });
    });
    body.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => cart.remove(btn.dataset.id));
    });

    document.getElementById('btn-proceed-checkout')?.addEventListener('click', () => {
      checkoutStep = 'checkout';
      renderCartBody();
    });
    document.getElementById('btn-continue-shopping')?.addEventListener('click', closeCartDrawer);

  } else {
    // Tela de Revisão e Envio via WhatsApp
    if (title) title.textContent = 'Dados do Pedido';

    body.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="form-group">
          <label>Seu Nome *</label>
          <input type="text" id="chk-name" class="form-control" placeholder="Como podemos te chamar?" value="${customerForm.name}">
        </div>
        <div class="form-group">
          <label>Telefone / WhatsApp</label>
          <input type="tel" id="chk-phone" class="form-control" placeholder="(15) 99999-9999" value="${customerForm.phone}">
        </div>
        <div class="form-group">
          <label>Forma de Atendimento *</label>
          <select id="chk-service" class="form-control">
            <option value="Retirada no Balcão" ${customerForm.serviceType === 'Retirada no Balcão' ? 'selected' : ''}>Retirada no Balcão (Iperó - Centro)</option>
            <option value="Entrega a Domicílio" ${customerForm.serviceType === 'Entrega a Domicílio' ? 'selected' : ''}>Entrega a Domicílio (Sob consulta de taxa)</option>
          </select>
        </div>
        <div class="form-group" id="chk-addr-group" style="${customerForm.serviceType === 'Entrega a Domicílio' ? 'display:flex' : 'display:none'}">
          <label>Endereço de Entrega *</label>
          <input type="text" id="chk-addr" class="form-control" placeholder="Rua, número e bairro em Iperó" value="${customerForm.address}">
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label>Data Desejada</label>
            <input type="date" id="chk-date" class="form-control" value="${customerForm.date}">
          </div>
          <div class="form-group">
            <label>Horário Desejado</label>
            <input type="time" id="chk-time" class="form-control" value="${customerForm.time}">
          </div>
        </div>
        <div class="form-group">
          <label>Observações / Forma de Pagamento</label>
          <textarea id="chk-notes" class="form-control" style="min-height:60px;" placeholder="Ex: Salgados quentinhos para as 18h, pagamento em Pix ou dinheiro...">${customerForm.notes}</textarea>
        </div>
        <div class="form-group">
          <label>Prévia da Mensagem para WhatsApp:</label>
          <div class="checkout-preview" id="checkout-msg-preview"></div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <button class="btn btn-whatsapp btn-lg" id="btn-send-whatsapp" style="width:100%;">
        💬 Confirmar e Enviar pelo WhatsApp
      </button>
      <button class="btn btn-outline btn-sm" id="btn-back-to-cart" style="width:100%;">
        ← Voltar ao Carrinho
      </button>
    `;

    // Atualizar preview dinamicamente
    const updatePreview = () => {
      customerForm.name = document.getElementById('chk-name').value;
      customerForm.phone = document.getElementById('chk-phone').value;
      customerForm.serviceType = document.getElementById('chk-service').value;
      customerForm.address = document.getElementById('chk-addr')?.value || '';
      customerForm.date = document.getElementById('chk-date').value;
      customerForm.time = document.getElementById('chk-time').value;
      customerForm.notes = document.getElementById('chk-notes').value;

      const addrGroup = document.getElementById('chk-addr-group');
      if (addrGroup) {
        addrGroup.style.display = customerForm.serviceType === 'Entrega a Domicílio' ? 'flex' : 'none';
      }

      const previewEl = document.getElementById('checkout-msg-preview');
      if (previewEl) {
        previewEl.textContent = generateOrderMessage();
      }
    };

    body.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', updatePreview);
    });

    updatePreview();

    document.getElementById('btn-back-to-cart')?.addEventListener('click', () => {
      checkoutStep = 'cart';
      renderCartBody();
    });

    document.getElementById('btn-send-whatsapp')?.addEventListener('click', () => {
      if (!customerForm.name.trim()) {
        showToast('Por favor, informe seu nome.');
        document.getElementById('chk-name').focus();
        return;
      }
      if (customerForm.serviceType === 'Entrega a Domicílio' && !customerForm.address.trim()) {
        showToast('Informe o endereço para a entrega.');
        document.getElementById('chk-addr').focus();
        return;
      }

      const orderMsg = generateOrderMessage();
      window.open(createWhatsAppUrl(orderMsg), '_blank', 'noopener');
    });
  }
}

function generateOrderMessage() {
  const state = cart.getState();
  const dateFormatted = customerForm.date ? customerForm.date.split('-').reverse().join('/') : 'A combinar';
  
  const itemsText = state.items.map(item => 
    `• ${item.product.name}: ${item.qty} un. × ${formatBRL(item.product.price)} = ${formatBRL(item.subtotal)}`
  ).join('\n');

  return `🥟 *NOVO PEDIDO — KIKI SALGADOS* 🥟

*Cliente:* ${customerForm.name || '—'}
${customerForm.phone ? `*Contato:* ${customerForm.phone}\n` : ''}
*ITENS DO PEDIDO:*
${itemsText}

*TOTAL:* ${formatBRL(state.totalPrice)} (${state.totalQty} salgados)

*Atendimento:* ${customerForm.serviceType}
${customerForm.serviceType === 'Entrega a Domicílio' ? `*Endereço:* ${customerForm.address}\n` : ''}*Data Desejada:* ${dateFormatted}
*Horário:* ${customerForm.time || 'A combinar'}
${customerForm.notes ? `*Observações:* ${customerForm.notes}\n` : ''}
_(Pedido enviado pelo Cardápio Digital da Kiki Salgados. Aguardo confirmação!)_`;
}

// 8. Contato e Informações da Loja
function initContact() {
  const addressEl = document.getElementById('contact-address');
  const phoneEl = document.getElementById('contact-phone');
  const hoursEl = document.getElementById('contact-hours');
  const mapLink = document.getElementById('contact-map-link');

  if (addressEl) addressEl.textContent = CONFIG.addressDisplay;
  if (phoneEl) {
    phoneEl.textContent = CONFIG.phoneDisplay;
    phoneEl.href = `tel:${CONFIG.whatsapp}`;
  }
  if (hoursEl) hoursEl.textContent = CONFIG.hours;
  if (mapLink) {
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`;
  }
}
