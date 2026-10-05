export type Service = {
  id: string;
  index: string;
  title: string;
  items: readonly string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  accent?: string;
  summary: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
};

export type TeamChapter = {
  id: string;
  index: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  focus?: string;
};

export type Client = {
  id: string;
  name: string;
  logo: string;
  summary: string;
};

export type SiteContent = {
  brand: string;
  hero: {
    lines: readonly string[];
    lead: string;
  };
  about: {
    title: string;
    body: string;
  };
  services: readonly Service[];
  cases: readonly CaseStudy[];
  team: readonly TeamChapter[];
  clients: readonly Client[];
  contact: {
    email: string;
    note: string;
  };
  footer: {
    mark: string;
    location: string;
    instagramLabel: string;
    instagramUrl: string;
    termsLabel: string;
    termsPath: string;
  };
  terms: {
    title: string;
    paragraphs: readonly string[];
  };
};

export const rail = [
  { id: "about", label: "About" },
  { id: "services", label: "Serviços" },
  { id: "cases", label: "Cases" },
  { id: "team", label: "Time" },
  { id: "clients", label: "Clientes" },
] as const;

export const site: SiteContent = {
  brand: "4scale",
  hero: {
    lines: ["Crescer é fácil.", "Escalar é", "Estratégia"],
    lead: "A 4SCALE une estratégia, dados e execução para escalar o seu negócio de forma inteligente.",
  },
  about: {
    title: "Operações de marketing inteligentes, com responsabilidade pelo resultado.",
    body: "A 4SCALE constrói operações mais transparentes e trata o negócio do cliente como parte do próprio trabalho. As decisões partem de dados, estratégia e escuta, com alinhamento periódico, até a entrega gerar resultado.",
  },
  services: [
    {
      id: "analise-de-dados",
      index: "01",
      title: "Análise de Dados",
      items: [
        "Análise e insights de dados",
        "Desenvolvimento de painéis de dados",
        "Otimização de taxa de conversão",
        "Análise de ADS",
        "Elaboração e análise de funis",
      ],
    },
    {
      id: "automacao",
      index: "02",
      title: "Automação",
      items: [
        "Automação de e-mails",
        "Automação de chatbots",
        "Automação de mensagens",
        "Automação de serviços",
      ],
    },
    {
      id: "midia-paga",
      index: "03",
      title: "Mídia Paga",
      items: [
        "Estratégia e planejamento de mídia",
        "Busca e social mídia paga",
        "Anúncios de marketing",
        "Criativos de alta conversão",
        "Programático e exibição",
      ],
    },
    {
      id: "midia-organica",
      index: "04",
      title: "Mídia Orgânica",
      items: [
        "Otimização de buscas",
        "Otimização de SEO",
        "Marketing de conteúdo",
        "Social mídia orgânica",
        "E-mail marketing",
      ],
    },
    {
      id: "saas",
      index: "05",
      title: "SaaS",
      items: [
        "Sistemas web robustos",
        "Acessíveis em qualquer ambiente",
        "Front-end intuitivo e back-end escalável",
      ],
    },
    {
      id: "criativos",
      index: "06",
      title: "Criativos",
      items: [
        "Criativos profissionais",
        "Produção de conteúdo",
        "Design gráfico",
        "Criativos de vídeo",
      ],
    },
    {
      id: "sites",
      index: "07",
      title: "Sites",
      items: [
        "Design e redesign de sites",
        "Performance e otimização de sites",
        "Layout e elaboração de LPs",
        "Páginas de captura e formulários",
        "Sites institucionais",
      ],
    },
    {
      id: "ecommerce",
      index: "08",
      title: "E-commerce",
      items: [
        "Análise e otimização de funis de e-commerce",
        "Implementação e gerenciamento de ferramentas de vendas",
        "Criação de catálogos e descrições de produtos",
        "Otimização de checkout e carrinhos abandonados",
        "Estratégias de retenção e fidelização",
      ],
    },
  ],
  cases: [
    {
      id: "acimaq",
      title: "Acimaq\nEquipamentos",
      accent: "Equipamentos",
      summary:
        "Receita de R$ 7,5 milhões e ROAS de 27,36x no setor industrial, com performance e automação comercial.",
      tags: ["Performance", "Automação", "B2B", "Industrial"],
      image: "/cases/acimaq.jpg",
      imageAlt: "Logo da Acimaq Equipamentos Comerciais",
    },
    {
      id: "colibri-festas",
      title: "Colibri\nFestas",
      accent: "Festas",
      summary:
        "De loja local a máquina de receita digital: R$ 7,7 milhões em campanhas e ROAS de 14,25x.",
      tags: ["Mídia paga", "Campanhas", "Receita", "ROAS"],
      image: "/cases/colibri.webp",
      imageAlt: "Logo da Colibri Festas e Decorações",
    },
    {
      id: "atlas",
      title: "Atlas\nLumina",
      accent: "Lumina",
      summary:
        "Um sistema de marca desenhado para sair do discurso e entrar na operação, com linguagem única do primeiro contato à escala.",
      tags: ["Pensamento", "Direção", "Identidade", "Sistema"],
      image: "/cases/atlas.svg",
      imageAlt: "Composição provisória do projeto Atlas Lumina",
    },
    {
      id: "norte",
      title: "Linha\nNorte",
      accent: "Norte",
      summary:
        "Estratégia de crescimento para uma oferta que precisava de foco: menos ruído, mais clareza sobre o que escala.",
      tags: ["Estratégia", "Oferta", "Narrativa", "Go-to-market"],
      image: "/cases/norte.svg",
      imageAlt: "Composição provisória do projeto Linha Norte",
    },
    {
      id: "sala",
      title: "Sala\nAberta",
      accent: "Aberta",
      summary:
        "Experiência digital e presencial no mesmo desenho, para a marca ser reconhecida antes de ser explicada.",
      tags: ["Experiência", "Digital", "Espaço", "Conteúdo"],
      image: "/cases/sala.svg",
      imageAlt: "Composição provisória do projeto Sala Aberta",
    },
    {
      id: "mare",
      title: "Maré\nAlta",
      accent: "Alta",
      summary:
        "Operação comercial reorganizada para sustentar demanda nova sem perder o critério que construiu a reputação.",
      tags: ["Escala", "Operação", "Performance", "Processo"],
      image: "/cases/mare.svg",
      imageAlt: "Composição provisória do projeto Maré Alta",
    },
  ],
  team: [
    {
      id: "carlos",
      index: "01",
      name: "Carlos",
      role: "CEO",
      image: "/team/carlos.jpg",
      imageAlt: "Carlos, CEO da 4SCALE",
    },
    {
      id: "joao",
      index: "02",
      name: "João",
      role: "CEO",
      image: "/team/joao.jpg",
      imageAlt: "João, CEO da 4SCALE",
      focus: "center 82%",
    },
    {
      id: "calazans",
      index: "03",
      name: "Calazans",
      role: "CEO",
      image: "/team/calazans.jpg",
      imageAlt: "Calazans, CEO da 4SCALE",
    },
    {
      id: "caroline-desenvolvimento",
      index: "04",
      name: "Caroline",
      role: "Desenvolvimento",
      image: "/team/caroline-desenvolvimento.jpg",
      imageAlt: "Caroline, Desenvolvimento da 4SCALE",
    },
    {
      id: "caroline-social-media",
      index: "05",
      name: "Caroline",
      role: "Social Media",
      image: "/team/caroline-social-media.jpg",
      imageAlt: "Caroline, Social Media da 4SCALE",
    },
    {
      id: "iara",
      index: "06",
      name: "Iara",
      role: "Performance",
      image: "/team/iara.jpg",
      imageAlt: "Iara, Performance da 4SCALE",
    },
    {
      id: "lucas",
      index: "07",
      name: "Lucas",
      role: "UX Design",
      image: "/team/lucas.jpg",
      imageAlt: "Lucas, UX Design da 4SCALE",
    },
    {
      id: "malu",
      index: "08",
      name: "Malu",
      role: "Social Media",
      image: "/team/malu.jpg",
      imageAlt: "Malu, Social Media da 4SCALE",
    },
    {
      id: "tarso",
      index: "09",
      name: "Tarso",
      role: "Designer",
      image: "/team/tarso.jpg",
      imageAlt: "Tarso, Designer da 4SCALE",
    },
  ],
  clients: [
    {
      id: "nano-smart",
      name: "Nano Smart",
      logo: "/logos/nano-smart.svg",
      summary:
        "Startup brasileira de nanotecnologia e biotecnologia. Desenvolve biossensores, testes rápidos (tecnologia lateral flow) e sistemas de leitura para saúde animal e segurança de alimentos.",
    },
    {
      id: "loga",
      name: "Loga",
      logo: "/logos/loga.svg",
      summary:
        "Empresa de telecomunicações do Espírito Santo que fornece internet banda larga de alta velocidade por meio de fibra óptica.",
    },
    {
      id: "pbenge",
      name: "PBENGE",
      logo: "/logos/logo-v2.svg",
      summary:
        "Empresa brasileira de engenharia de alta performance e tecnologia aplicada à construção, especializada em obras e reformas de alta complexidade para os setores industrial e comercial.",
    },
    {
      id: "tributacao-medica",
      name: "Tributação Médica",
      logo: "/logos/tributacao-medica.svg",
      summary: "",
    },
    {
      id: "dra-karla",
      name: "Dra. Karla Kelevedove",
      logo: "/logos/dra-karla.svg",
      summary: "Médica alergista e imunologista.",
    },
    {
      id: "colibri",
      name: "Colibri",
      logo: "/logos/colibri.svg",
      summary:
        "Rede de lojas física e virtual do Espírito Santo, especializada em artigos para festas, confeitaria, embalagens, decoração e produtos sazonais.",
    },
    {
      id: "irene-baldi",
      name: "Irene Baldi",
      logo: "/logos/irene-baldi.svg",
      summary: "Médica dermatologista.",
    },
    {
      id: "vinsel-vinhos",
      name: "Vinsel Vinhos",
      logo: "/logos/cliente-21.svg",
      summary:
        "Empresa capixaba de vinhos. Focada em democratizar o consumo de vinho no Brasil, a importadora traz um catálogo selecionado de vinícolas tradicionais de várias partes do mundo.",
    },
    {
      id: "instituto-lorena-baldotto",
      name: "Instituto Lorena Baldotto",
      logo: "/logos/cliente-20.svg",
      summary:
        "Clínica médica localizada em Vitória (ES), especializada em saúde da mulher, bem-estar e tratamentos integrativos.",
    },
    {
      id: "cseros-cosmetics",
      name: "Cséros cosmetics",
      logo: "/logos/cliente-19.svg",
      summary:
        "Marca brasileira de cosméticos inovadora, amplamente reconhecida por ter desenvolvido o MYDE, considerado o primeiro desodorante enzimático do mundo.",
    },
    {
      id: "abf-tech",
      name: "ABF TECH",
      logo: "/logos/cliente-18.svg",
      summary:
        "Empresa capixaba de tecnologia, especializada em desenvolvimento de software sob encomenda, consultoria em TI e integração de sistemas.",
    },
    {
      id: "cdl",
      name: "CDL",
      logo: "/logos/cdl.svg",
      summary:
        "Câmara de Dirigentes Lojistas, uma associação civil sem fins lucrativos presente em milhares de municípios brasileiros.",
    },
  ],
  contact: {
    email: "contato@4scale.com",
    note: "Conte o contexto, o prazo e o que precisa escalar.",
  },
  footer: {
    mark: "4SCALE",
    location: "Vitória – Espírito Santo",
    instagramLabel: "Instagram",
    instagramUrl: "https://www.instagram.com/4scale.mkt/",
    termsLabel: "Termos de Uso",
    termsPath: "/termos",
  },
  terms: {
    title: "Termos de Uso",
    paragraphs: [
      "Este site apresenta a 4SCALE, sua forma de trabalho e os projetos publicados. O uso das páginas implica a leitura destes termos.",
      "Textos, marcas, imagens e demais materiais exibidos pertencem à 4SCALE ou a terceiros que autorizaram o uso. Não é permitida a reprodução sem autorização prévia.",
      "As informações são publicadas de boa-fé e podem ser atualizadas. O site é oferecido no estado em que se encontra, sem garantia de disponibilidade contínua.",
      "Dúvidas sobre estes termos podem ser enviadas para contato@4scale.com.",
    ],
  },
};
