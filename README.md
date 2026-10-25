# 🥟 Kiki Salgados — Cardápio Digital & Sistema de Pedidos

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Status](https://img.shields.io/badge/Status-Produção%20Pronta-brightgreen)]()
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat&logo=node.js)]()
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

Cardápio digital moderno, interativo e de alta conversão desenvolvido para a **Kiki Salgados** (Iperó - SP). O cliente escolhe os salgados, monta kits personalizados com cálculo instantâneo e envia o pedido formatado diretamente para o WhatsApp da loja em poucos cliques.

---

## 🌟 Principais Funcionalidades

- **⚡ Compra Direta ("Pedir já")**: Botão ágil para pedidos rápidos sem complicações.
- **🎯 Monte seu Kit**: Seleção interativa de sabores com cálculo em tempo real de valores e unidades.
- **🕒 Previsão & Horário de Entrega**: Opção rápida de "Mais rápido possível (30-50 min)" ou agendamento para horários específicos.
- **🛒 Carrinho Dinâmico**: Controle de itens, cálculo de taxa de entrega ou opção de retirada no balcão.
- **📲 Integração Direta com WhatsApp**: Mensagem formatada enviada diretamente para a loja com itens, valores, dados de entrega e previsão de horário — sem pedir o telefone do cliente repetidamente.
- **📍 Localização Integrada**: Link com rota direta no Google Maps para a loja física.
- **📱 100% Responsivo e Leve**: Otimizado para smartphones (mobile-first), com carregamento instantâneo.

---

## 📍 Informações da Loja

- **Endereço**: Rua Costa e Silva, nº 226 (Ao lado do Hotel Vitória, na rua do Cartório Eleitoral) — Iperó, SP — CEP 18560-000
- **WhatsApp**: [+55 15 99802-9216](https://wa.me/5515998029216)
- **Horário de Atendimento**: Terça a Domingo, das 10h às 22h

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Variáveis, Flexbox, CSS Grid, Glassmorphism, Micro-animações).
- **Lógica & Interatividade**: JavaScript Vanilla modular e reativo.
- **Build & Dev Tooling**: [Vite](https://vitejs.dev/) para empacotamento rápido e preview local.
- **Deploy**: Otimizado para hospedagem estática no [Vercel](https://vercel.com) ou [GitHub Pages](https://pages.github.com/).

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/kiki-salgados.git
cd kiki-salgados
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor iniciará localmente (por exemplo em `http://localhost:5173` ou na porta configurada).

### 4. Gerar build de produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

---

## ☁️ Como Fazer o Deploy no Vercel

1. Suba o projeto para o seu GitHub:
   ```bash
   git add .
   git commit -m "docs: adiciona documentação do projeto"
   git push origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
3. Clique em **"Add New Project"** e importe o repositório **kiki-salgados**.
4. Nas configurações de build:
   - **Framework Preset**: `Vite` (ou `Other`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em **Deploy**. Em poucos segundos o link estará no ar com HTTPS gratuito!

---

## 📁 Estrutura de Pastas

```text
Kiki-Salgados/
├── public/
│   └── images/              # Imagens reais e otimizadas dos salgados e kits
├── src/
│   ├── main.js              # Script principal
│   └── style.css            # Estilos auxiliares
├── index.html               # Ponto de entrada da aplicação (HTML completo e responsivo)
├── package.json             # Dependências e scripts npm
├── vite.config.js           # Configurações do Vite
├── .gitignore               # Arquivos e diretórios ignorados no Git
├── CHANGELOG.md             # Histórico de versões e alterações
└── README.md                # Documentação do projeto
```

---

## 📄 Licença e Direitos

Projeto desenvolvido para a Kiki Salgados. Todos os direitos reservados.
