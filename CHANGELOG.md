# Changelog

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.2.0] - 2026-10-25

### ✨ Novas Funcionalidades
- **Botão Direto "⚡ Pedir já" em cada card**: Permite que o cliente inicie o pedido de um salgado com apenas 1 clique, sem precisar montar o kit manualmente caso queira pedir rapidamente.
- **Seletor de Previsão de Entrega / Horário ("Para quando?")**:
  - Opções rápidas: *O mais rápido possível (30-50 min)* ou *Agendar para hoje / data futura*.
  - Facilita a logística da cozinha e reduz trocas de mensagens no WhatsApp.

### ⚡ Melhorias de Fluxo e Usabilidade (Frictionless UX)
- **Remoção de campo redundante**: Removido o campo que pedia o telefone do próprio cliente no formulário, já que o pedido é enviado pelo próprio WhatsApp do cliente.
- **Seletor Rápido de Quantidades (Chips)**: Adicionados botões de atalho rápido de quantidade (**10**, **25**, **50**, **100** unidades) nos modais e na montagem de kit.
- **Estruturação de Mensagem Automática**: Montagem inteligente da mensagem do WhatsApp formatada com quebra de linha limpa, resumo de itens, cálculo de subtotal, endereço de entrega/retirada e estimativa de horário.

### 🧹 Organização e Governança do Repositório
- Configuração do `.gitignore` para ignorar mídias pesadas de teste (`audios/`, `*.mp3`, `*.wav`), caches e scripts utilitários de desenvolvimento (`generate_narration.py`, `list_voices.py`).
- Estruturação de documentação oficial com `README.md` e `CHANGELOG.md`.

---

## [1.1.0] - 2026-10-24

### 📸 Imagens e Apresentação Visual
- **Fotografia gastronômica em alta definição**: Geração e inclusão de fotos realistas para todos os produtos do cardápio:
  - Coxinha de Frango com Requeijão Cremoso
  - Bolinho de Queijo Crocante
  - Bolinha de Calabresa com Queijo
  - Croquete de Carne Especial
  - Kiki Box / Combo Salgados Variados
  - Travesseirinho de Presunto e Queijo
  - Cartucho de Queijo & Bacon
  - Cremosinho de Milho & Catupiry
  - Croquete Calafrango
- **Identidade Visual Temática**: Ajuste fino da paleta de cores Kiki Salgados (âmbar, dourado e tons quentes de fritura sequinha e crocante).

### 📍 Localização e Contato
- Integração de link direto para rota no **Google Maps** apontando para o endereço físico:
  - *Rua Costa e Silva, nº 226, Iperó - SP (Ao lado do Hotel Vitória)*.
- Integração com o canal oficial de atendimento via WhatsApp (`(15) 99802-9216`).

---

## [1.0.0] - 2026-10-24

### 🚀 Lançamento Inicial
- Estrutura base da landing page e cardápio digital responsivo (Desktop e Mobile-first).
- Seletor de categorias: *Mais Pedidos*, *Fritos*, *Kits & Combos*, *Bebidas & Doces*.
- Carrinho dinâmico com cálculo de valores em tempo real.
- Suporte a pedidos para Retirada no Balcão ou Delivery com taxa configurável.
- Configuração de build e preview com Vite.
