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

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  description: string;
};

const sharedSkills = [
  {
    title: "Front-end Development",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "UI & Product Design",
    items: ["Interface Design", "Wireframing", "Prototyping", "Design Systems", "Responsive Design"],
  },
  {
    title: "Digital Products",
    items: ["Reusable Components", "Performance Optimization", "SaaS Interfaces", "Admin Panels"],
  },
  {
    title: "E-commerce & Integrations",
    items: ["VTEX", "PHP", "SQL Server", "Supabase", "PostgreSQL", "Stripe", "Mercado Pago"],
  },
  {
    title: "Visual Design",
    items: ["Graphic Design", "YouTube Thumbnails", "Social Media Assets", "Brand Materials"],
  },
  {
    title: "Workflow",
    items: ["GitHub", "Vercel", "cPanel", "AI-assisted Development"],
  },
] as const;

const sharedTools = ["Figma", "Photoshop", "Illustrator", "VS Code", "GitHub", "Vercel", "Supabase", "VTEX", "cPanel", "AI Tools"] as const;

export const portfolioCopy = {
  en: {
    language: { en: "EN", pt: "PT", aria: "Change language" },
    navigation: [
      { href: "#summary", label: "Summary" },
      { href: "#experience", label: "Experience" },
      { href: "#education", label: "Education" },
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
          period: "2018 - Present",
          role: "Front-end Developer",
          company: "Websites, landing pages and digital products",
          details:
            "I build responsive, high-performing digital products with React, TypeScript and modern CSS, focusing on reusable components, scalable interfaces and clean user experiences across devices.",
        },
        {
          period: "2013 - Present",
          role: "Graphic Designer",
          company: "Brand, content and visual systems",
          details:
            "I create visual identities, campaign assets and digital materials that help brands look more professional, consistent and ready to sell.",
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Academic path connecting software, systems, and applied technology.",
      items: [
        {
          institution: "Caroline University",
          degree: "Master's Degree in Information Systems (Ongoing)",
          location: "California, United States",
          description:
            "Postgraduate studies focused on information systems, software engineering, digital transformation, data-driven decision making, and emerging technologies.",
        },
        {
          institution: "Universidade Nove de Julho",
          degree: "Bachelor's Degree in Computer Science",
          location: "Brazil",
          description:
            "Complete training in software development, computer systems, algorithms, software engineering, databases, and information technology.",
        },
        {
          institution: "Instituto Federal de Goiás",
          degree: "Technical Course in Computer Support and Maintenance",
          location: "Brazil",
          description:
            "Technical training in computer systems, hardware maintenance, networking fundamentals, and information technology support.",
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
        title: "Centro Veterinário Linda-a-Velha",
        category: "Institutional website",
        description: "Institutional website for a veterinary clinic in Portugal, focused on clear service presentation, responsive layout, local credibility and a friendly digital experience for pet owners.",
        stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub", "Vercel"],
        url: "#",
      },
      {
        title: "Villa Mu",
        category: "MMORPG Game Platform",
        description: "Website for Villa Mu, an MMORPG private server, featuring player account area, rankings, referral rewards, event schedules, and payment integrations.",
        stack: ["PHP", "SQL Server", "cPanel", "HTML", "CSS", "JavaScript", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Collaborations",
      title: "Selected Brands & Collabs",
      items: [
        {
          name: "KitchenAid Brasil",
          description: "Front-end and digital product work for an enterprise e-commerce experience.",
        },
        {
          name: "Honda",
          description: "Visual and digital design work for brand-related communication materials.",
        },
        {
          name: "Itaú",
          description: "Graphic design and digital assets for branded communication projects.",
        },
        {
          name: "Órigo Energia",
          description: "Visual and digital design work for renewable energy communication materials.",
        },
        {
          name: "Jussi",
          description: "Digital and visual work connected to product, brand, and communication initiatives.",
        },
        {
          name: "M7A7",
          description: "Visual assets and brand materials for digital communication projects.",
        },
      ],
    },
    designWork: {
      eyebrow: "Design Work",
      title: "YouTube thumbnails and visual assets built for attention.",
      visit: "View channel",
      items: [
        {
          name: "Canal do Rique",
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
      groups: sharedSkills,
      toolsTitle: "Tools",
      tools: sharedTools,
    },
    links: {
      eyebrow: "Links",
      title: "Letâ€™s build something with presence.",
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
      { href: "#education", label: "Escolaridade" },
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
          period: "2018 - Atual",
          role: "Front-end Developer",
          company: "Websites, landing pages e produtos digitais",
          details:
            "Construo produtos digitais responsivos e performaticos com React, TypeScript e CSS moderno, com foco em componentes reutilizaveis, interfaces escalaveis e experiencias limpas em diferentes dispositivos.",
        },
        {
          period: "2013 - Atual",
          role: "Graphic Designer",
          company: "Marca, conteudo e sistemas visuais",
          details:
            "Crio identidades visuais, pecas de campanha e materiais digitais que ajudam marcas a parecerem mais profissionais, consistentes e prontas para vender.",
        },
      ],
    },
    education: {
      eyebrow: "Escolaridade",
      title: "Formacao academica conectando software, sistemas e tecnologia aplicada.",
      items: [
        {
          institution: "Caroline University",
          degree: "Mestrado em Sistemas de Informacao (Em andamento)",
          location: "California, Estados Unidos",
          description:
            "Estudos de pos-graduacao com foco em sistemas de informacao, engenharia de software, transformacao digital, tomada de decisoes baseada em dados e tecnologias emergentes.",
        },
        {
          institution: "Universidade Nove de Julho",
          degree: "Bacharelado em Ciencia da Computacao",
          location: "Brasil",
          description:
            "Formacao completa em desenvolvimento de software, sistemas de computadores, algoritmos, engenharia de software, bancos de dados e tecnologia da informacao.",
        },
        {
          institution: "Instituto Federal de Goias",
          degree: "Curso Tecnico em Suporte e Manutencao de Computadores",
          location: "Brasil",
          description:
            "Formacao tecnica em sistemas de computadores, manutencao de hardware, fundamentos de redes e suporte em tecnologia da informacao.",
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
        title: "Centro Veterinário Linda-a-Velha",
        category: "Site institucional",
        description: "Site institucional para uma clinica veterinaria em Portugal, com foco em apresentacao clara dos servicos, layout responsivo, credibilidade local e uma experiencia digital amigavel para tutores de pets.",
        stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub", "Vercel"],
        url: "#",
      },
      {
        title: "Villa Mu",
        category: "Site gaming",
        description: "Site para a Villa Mu (Jogo MMORPG) com área logada do jogador, exibição de rankings, sistema de indicações e integrações de pagamento.",
        stack: ["PHP", "SQL Server", "cPanel", "HTML", "CSS", "JavaScript", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Colaboracoes",
      title: "Marcas e colaboracoes selecionadas",
      items: [
        {
          name: "KitchenAid Brasil",
          description: "Front-end e produto digital para uma experiencia de e-commerce enterprise.",
        },
        {
          name: "Honda",
          description: "Design visual e digital para materiais de comunicacao relacionados a marca.",
        },
        {
          name: "Itaú",
          description: "Design grafico e assets digitais para projetos de comunicacao de marca.",
        },
        {
          name: "Órigo Energia",
          description: "Design visual e digital para materiais de comunicacao de energia renovavel.",
        },
        {
          name: "Jussi",
          description: "Trabalho digital e visual conectado a iniciativas de produto, marca e comunicacao.",
        },
        {
          name: "M7A7",
          description: "Assets visuais e materiais de marca para projetos de comunicacao digital.",
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
      groups: sharedSkills,
      toolsTitle: "Tools",
      tools: sharedTools,
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
