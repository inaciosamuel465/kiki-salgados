export const CONFIG = {
  storeName: "Kiki Salgados",
  tagline: "Salgados de festa com qualidade e preço justo",
  phoneDisplay: "+55 15 99802-9216",
  whatsapp: "5515998029216",
  addressDisplay: "Rua: Costa e Silva, nº 226 (Ao lado do Hotel Vitória, na rua do Cartório Eleitoral) — Iperó, SP",
  cep: "18560-000",
  city: "Iperó, SP",
  mapQuery: "Rua Costa e Silva 226 Ipero SP",
  hours: "Segunda a Sábado — Encomendas e Pronta Entrega",
  unitPrice: 72, // R$ 0,72 em centavos
  defaultQty: 10,
  presets: [10, 15, 20, 25, 30, 40, 50, 75, 100],
  featured: ["coxinha", "bolinho-queijo", "bolinha-calabresa", "croquete-carne"]
};

export const CATEGORIES = ["Todos", "Carnes e Frango", "Queijos"];

export const PRODUCTS = [
  {
    id: "coxinha",
    name: "Coxinha de Frango",
    cat: "Carnes e Frango",
    desc: "A clássica coxinha dourada e super crocante, com recheio suculento e tempero caseiro.",
    price: 72,
    image: "/images/coxinha.jpg",
    badge: "Mais pedida"
  },
  {
    id: "bolinho-queijo",
    name: "Bolinho de Queijo",
    cat: "Queijos",
    desc: "Massa leve e sequinha com recheio cremoso e queijo puxa-puxa de derreter na boca.",
    price: 72,
    image: "/images/bolinho-queijo.jpg",
    badge: "Favorito"
  },
  {
    id: "bolinha-calabresa",
    name: "Bolinha de Calabresa",
    cat: "Carnes e Frango",
    desc: "Salgadinho frito crocante recheado com calabresa moída bem temperada no capricho.",
    price: 72,
    image: "/images/bolinha-calabresa.jpg",
    badge: "Top vendas"
  },
  {
    id: "croquete-carne",
    name: "Croquete de Carne",
    cat: "Carnes e Frango",
    desc: "Croquete tradicional de carne desfiada/moída bem suculenta, dourado e irresistível.",
    price: 72,
    image: "/images/croquete-carne.jpg"
  },
  {
    id: "croquete-calafrango",
    name: "Croquete de Calafrango",
    cat: "Carnes e Frango",
    desc: "Combinação especial e exclusiva de calabresa com frango desfiado cremoso.",
    price: 72,
    image: "/images/croquete-calafrango.jpg"
  },
  {
    id: "travesseirinho",
    name: "Travesseirinho de Presunto e Queijo",
    cat: "Queijos",
    desc: "Pastelzinho travesseirinho sequinho com recheio farto de presunto e queijo derretido.",
    price: 72,
    image: "/images/travesseirinho.jpg"
  },
  {
    id: "cartucho-queijo-azeitona",
    name: "Cartucho de Queijo com Azeitonas",
    cat: "Queijos",
    desc: "Cartucho crocante de queijo cremoso enriquecido com azeitonas selecionadas.",
    price: 72,
    image: "/images/cartucho-queijo.jpg"
  },
  {
    id: "cremosinho-queijo-milho",
    name: "Cremosinho de Queijo com Milho",
    cat: "Queijos",
    desc: "Salgadinho redondo recheado com queijo derretido e milho verde fresco cremoso.",
    price: 72,
    image: "/images/cremosinho-milho.jpg"
  }
];

export const KITS_ORCAMENTO = [
  {
    title: "Kit Pequenas Reuniões",
    qty: "50 a 100 salgados",
    desc: "Ideal para aniversários íntimos, recepções, reuniões de família ou comemorações no trabalho.",
    icon: "🎉",
    badge: "5 a 10 pessoas"
  },
  {
    title: "Kit Aniversário & Festas",
    qty: "150 a 300 salgados",
    desc: "Variedade completa com coxinhas, bolinhas de queijo, calabresa e croquetes fresquinhos.",
    icon: "🎂",
    badge: "15 a 30 pessoas"
  },
  {
    title: "Kit Confraternização",
    qty: "350 a 500 salgados",
    desc: "Fartura e sabor para empresas, confraternizações, noivados e eventos especiais.",
    icon: "🥂",
    badge: "35 a 50 pessoas"
  },
  {
    title: "Kit Grandes Eventos",
    qty: "600+ salgados",
    desc: "Condições sob medida para igrejas, escolas, casamentos e grandes celebrações em Iperó e região.",
    icon: "⭐",
    badge: "Grandes ocasiões"
  }
];
