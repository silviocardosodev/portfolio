export type Locale = "en" | "pt";

export type Project = {
  title: string;
  category: string;
  description: string;
  stack: readonly string[];
  url: string;
};

export type DesignWork = {
  name: string;
  category: string;
  description: string;
  url: string;
  tone: "red" | "gold";
};

const sharedSkills = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Responsive UI"],
  design: ["Graphic Design", "Brand Systems", "UI Design", "Figma", "Visual Direction"],
  workflow: ["Git", "Performance", "Accessibility", "Design Systems", "SEO Basics"],
};

export const portfolioCopy = {
  en: {
    language: { en: "EN", pt: "PT", aria: "Change language" },
    navigation: [
      { href: "#summary", label: "Summary" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#links", label: "Links" },
    ],
    hero: {
      status: "Open to work",
      intro: "Portfolio 2026",
      name: "Silvio Cardoso",
      role: "Front-end Developer / Graphic Designer",
      description:
        "I build polished digital interfaces with a strong eye for layout, interaction, and brand presence.",
      contact: "Contact me",
      cv: "Download CV",
      scroll: "Scroll",
    },
    summary: {
      eyebrow: "About me",
      title: "About me",
      body:
        "Front-end developer and graphic designer creating modern, responsive interfaces with React, Next.js, TypeScript, and CSS. I combine design, code, and artificial intelligence to build functional, well-presented digital projects oriented toward results.",
      actionsLabel: "Portfolio actions",
      quickTalk: "Quick talk",
    },
    experience: {
      eyebrow: "Experience",
      title: "Designing and building digital experiences that feel clear, useful and intentional.",
      items: [
        {
          period: "2024 - Present",
          role: "Front-end Developer",
          company: "Websites, landing pages and digital products",
          details:
            "I build responsive, high-performing interfaces using React, Next.js, TypeScript and CSS, combining visual accuracy with practical product thinking.",
        },
        {
          period: "2021 - Present",
          role: "Graphic Designer",
          company: "Brand, content and visual systems",
          details:
            "I create visual identities, campaign assets and digital materials that help brands look more professional, consistent and ready to sell.",
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work shaped for clarity, speed, and visual impact.",
      visit: "View project",
    },
    projectItems: [
      {
        title: "KitchenAid Brasil",
        category: "Enterprise e-commerce",
        description: "An enterprise VTEX e-commerce experience for a global brand, focused on front-end, components, CSS, and the shopping experience.",
        stack: ["VTEX IO", "React", "TypeScript", "JavaScript", "Reusable Components", "VTEX Checkout"],
        url: "https://www.kitchenaid.com.br/",
      },
      {
        title: "FLPsicoFlow",
        category: "SaaS Web",
        description: "A SaaS web app for psychologists to manage patients, sessions, schedule, and finances.",
        stack: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
        url: "https://flpsicoflow-v1.vercel.app/",
      },
      {
        title: "Villa Mu",
        category: "Real estate website",
        description: "A commercial website for Villa Mu with property presentation, payment integrations, and a practical management-ready stack.",
        stack: ["PHP", "SQL Server", "cPanel", "HTML", "CSS", "JavaScript", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Collaborations",
      title: "Selected Brands & Collabs",
      items: [
        {
          name: "Honda",
          description: "Visual and digital design work for brand-related communication materials.",
        },
        {
          name: "Itau",
          description: "Graphic design and digital assets for branded communication projects.",
        },
      ],
    },
    designWork: {
      eyebrow: "Design Work",
      title: "YouTube thumbnails and visual assets built for attention.",
      visit: "View channel",
      items: [
        {
          name: "Rique Paiva",
          category: "YouTube Thumbnails",
          description: "Started before 1K subscribers. Today, the channel has over 251K subscribers, with thumbnails and visual assets designed for attention, clarity, and channel growth.",
          url: "https://www.youtube.com/@CanalDoRique7/videos",
          tone: "red",
        },
        {
          name: "Jotinha TV",
          category: "YouTube Thumbnails",
          description: "From Shorts to long-form content, Jotinha TV started using my thumbnails to create stronger visual hooks, clearer titles, and more clickable video presentations.",
          url: "https://www.youtube.com/@JotinhaTV_/videos",
          tone: "gold",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Tools and practices I use to move from idea to finished interface.",
      groups: [
        { title: "Front-end", items: sharedSkills.frontend },
        { title: "Design", items: sharedSkills.design },
        { title: "Workflow", items: sharedSkills.workflow },
      ],
    },
    links: {
      eyebrow: "Links",
      title: "Let’s build something with presence.",
      description: "Available for front-end work, design collaboration, and portfolio or brand-focused web projects.",
      items: [
        { label: "Email", href: "mailto:hello@silviocardoso.dev" },
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
        { label: "GitHub", href: "https://github.com/" },
        { label: "Behance", href: "https://www.behance.net/" },
      ],
    },
  },
  pt: {
    language: { en: "EN", pt: "PT", aria: "Trocar idioma" },
    navigation: [
      { href: "#summary", label: "Resumo" },
      { href: "#experience", label: "Experiencia" },
      { href: "#projects", label: "Projetos" },
      { href: "#skills", label: "Skills" },
      { href: "#links", label: "Links" },
    ],
    hero: {
      status: "Open to work",
      intro: "Portfolio 2026",
      name: "Silvio Cardoso",
      role: "Front-end Developer / Graphic Designer",
      description:
        "Crio interfaces digitais refinadas, com olhar forte para layout, interacao e presenca de marca.",
      contact: "Entrar em contato",
      cv: "Baixar CV",
      scroll: "Rolar",
    },
    summary: {
      eyebrow: "Sobre mim",
      title: "Sobre mim",
      body:
        "Desenvolvedor front-end e designer grafico, criando interfaces modernas e responsivas com React, Next.js, TypeScript e CSS. Uno design, codigo e inteligencia artificial para construir projetos digitais funcionais, bem apresentados e orientados a resultado.",
      actionsLabel: "Acoes do portfolio",
      quickTalk: "Conversa rapida",
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Projetando e construindo experiencias digitais claras, uteis e intencionais.",
      items: [
        {
          period: "2024 - Atual",
          role: "Front-end Developer",
          company: "Websites, landing pages e produtos digitais",
          details:
            "Construo interfaces responsivas e performaticas usando React, Next.js, TypeScript e CSS, combinando precisao visual com pensamento pratico de produto.",
        },
        {
          period: "2021 - Atual",
          role: "Graphic Designer",
          company: "Marca, conteudo e sistemas visuais",
          details:
            "Crio identidades visuais, pecas de campanha e materiais digitais que ajudam marcas a parecerem mais profissionais, consistentes e prontas para vender.",
        },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Trabalhos selecionados com clareza, velocidade e impacto visual.",
      visit: "Ver projeto",
    },
    projectItems: [
      {
        title: "KitchenAid Brasil",
        category: "E-commerce enterprise",
        description: "E-commerce enterprise em VTEX para marca global, com foco em front-end, componentes, CSS e experiencia de compra.",
        stack: ["VTEX IO", "React", "TypeScript", "JavaScript", "Componentes Reutilizaveis", "VTEX Checkout"],
        url: "https://www.kitchenaid.com.br/",
      },
      {
        title: "FLPsicoFlow",
        category: "SaaS Web",
        description: "SaaS web para psicologas gerenciarem pacientes, sessoes, agenda e financas.",
        stack: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
        url: "https://flpsicoflow-v1.vercel.app/",
      },
      {
        title: "Villa Mu",
        category: "Site imobiliario",
        description: "Site comercial para a Villa Mu com apresentacao de imoveis, integracoes de pagamento e uma stack pratica para gestao.",
        stack: ["PHP", "SQL Server", "cPanel", "HTML", "CSS", "JavaScript", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Colaboracoes",
      title: "Marcas e colaboracoes selecionadas",
      items: [
        {
          name: "Honda",
          description: "Design visual e digital para materiais de comunicacao relacionados a marca.",
        },
        {
          name: "Itau",
          description: "Design grafico e assets digitais para projetos de comunicacao de marca.",
        },
      ],
    },
    designWork: {
      eyebrow: "Design Work",
      title: "YouTube thumbnails and visual assets built for attention.",
      visit: "Ver canal",
      items: [
        {
          name: "Rique Paiva",
          category: "Thumbnails de YouTube",
          description: "Comecei antes do canal chegar a 1 mil inscritos. Hoje, o canal tem mais de 251 mil inscritos, com thumbnails e assets visuais criados para atencao, clareza e crescimento.",
          url: "https://www.youtube.com/@CanalDoRique7/videos",
          tone: "red",
        },
        {
          name: "Jotinha TV",
          category: "Thumbnails de YouTube",
          description: "De Shorts a conteudos longos, o Jotinha TV passou a usar minhas thumbnails para criar ganchos visuais mais fortes, titulos mais claros e apresentacoes de video mais clicaveis.",
          url: "https://www.youtube.com/@JotinhaTV_/videos",
          tone: "gold",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Ferramentas e praticas que uso para levar uma ideia ate a interface final.",
      groups: [
        { title: "Front-end", items: sharedSkills.frontend },
        { title: "Design", items: sharedSkills.design },
        { title: "Workflow", items: sharedSkills.workflow },
      ],
    },
    links: {
      eyebrow: "Links",
      title: "Vamos criar algo com presenca.",
      description: "Disponivel para front-end, colaboracoes de design e projetos web focados em portfolio ou marca.",
      items: [
        { label: "Email", href: "mailto:hello@silviocardoso.dev" },
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
        { label: "GitHub", href: "https://github.com/" },
        { label: "Behance", href: "https://www.behance.net/" },
      ],
    },
  },
} as const;
