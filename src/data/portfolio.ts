export type Locale = "en" | "pt";

export type Project = {
  title: string;
  category: string;
  description: string;
  role?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
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

const sharedSkillsEn = [
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

const sharedSkillsPt = [
  {
    title: "Desenvolvimento Front-end",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "UI & Design de Produto",
    items: ["Design de Interface", "Wireframes", "Prototipação", "Sistemas de Design", "Design Responsivo"],
  },
  {
    title: "Produtos Digitais",
    items: ["Componentes Reutilizáveis", "Otimização de Performance", "Interfaces SaaS", "Painéis de Administração"],
  },
  {
    title: "E-commerce & Integrações",
    items: ["VTEX", "PHP", "SQL Server", "Supabase", "PostgreSQL", "Stripe", "Mercado Pago"],
  },
  {
    title: "Design Visual",
    items: ["Design Gráfico", "Thumbnails de YouTube", "Materiais para Redes Sociais", "Materiais de Marca"],
  },
  {
    title: "Fluxo de Trabalho",
    items: ["GitHub", "Vercel", "cPanel", "Desenvolvimento com IA"],
  },
] as const;

const sharedToolsEn = ["Figma", "Photoshop", "Illustrator", "VS Code", "GitHub", "Vercel", "Supabase", "VTEX", "cPanel", "AI Tools"] as const;
const sharedToolsPt = ["Figma", "Photoshop", "Illustrator", "VS Code", "GitHub", "Vercel", "Supabase", "VTEX", "cPanel", "Ferramentas de IA"] as const;

const birthDate = { year: 1996, month: 11, day: 22 } as const;

function getAge({ year, month, day }: typeof birthDate) {
  const today = new Date();
  const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
  const age = today.getFullYear() - year;

  return today < birthdayThisYear ? age - 1 : age;
}

const heroRoleEn = `Front-end Developer  |  ${getAge(birthDate)} years old  |  Brazilian`;
const heroRolePt = `Desenvolvedor Front-end  |  ${getAge(birthDate)} anos  |  Brasileiro`;

export const portfolioCopy = {
  en: {
    language: { en: "EN", pt: "PT", aria: "Change language" },
    navigation: [
      { href: "#hero", label: "Home" },
      { href: "#summary", label: "About Me" },
      { href: "#projects", label: "Projects" },
      { href: "#demos", label: "Demos" },
      { href: "#collabs", label: "Collabs" },
      { href: "#design-work", label: "Design Work" },
      { href: "#skills", label: "Skills" },
      { href: "#links", label: "Links" },
    ],
    hero: {
      status: "Open to work",
      intro: "Portfolio 2026",
      name: "Silvio Cardoso",
      role: heroRoleEn,
      description:
        "I build polished digital interfaces with a strong eye for layout, interaction, and brand presence.",
      contact: "Contact me",
      experience: "View experience",
      cv: "Download CV",
      scroll: "Scroll",
    },
    summary: {
      eyebrow: "About me",
      title: "A little bit of my story",
      paragraphs: [
        "I’m a Brazilian frontend developer and graphic designer with over five years of experience building responsive, high-performance digital products.",
        "My background combines Computer Science, graphic design, and hands-on experience with real-world projects. I began my professional career in web development at Jüssi and, since then, I have worked with multidisciplinary teams and major brands such as KitchenAid, Itaú, and Honda, developing accessible, responsive, and reusable interfaces.",
        "Today, I work primarily with React and TypeScript, with a strong focus on component architecture, performance and user experience. I’m currently pursuing a master’s degree in California, expanding both my technical and product-oriented perspective.",
      ],
      funFactsTitle: "Fun Facts",
      funFacts: [
        "São Paulo Futebol Clube supporter",
        "Mercedes F1 fan",
        "I like playing guitar",
        "I love playing F1, and I even started a YouTube channel for it",
        "I used to have a band in school",
        "I love barbecue and hamburgers",
      ],
      actionsLabel: "Portfolio actions",
      quickTalk: "Quick talk",
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional experience building scalable front-end products for major brands.",
      items: [
        {
          period: "2021 - 2024",
          role: "Mid-level Front-end Developer",
          company: "Jüssi",
          details: [
            "Developed and maintained large-scale e-commerce solutions for KitchenAid Brazil (Whirlpool Corporation) using React and VTEX IO.",
            "Contributed to frontend architecture standards, reusable component libraries, and engineering best practices.",
            "Participated in software quality, maintainability, and scalability initiatives.",
            "Improved website performance by 72% through frontend optimization and CSS architecture refactoring.",
            "Developed customized checkout and customer account experiences.",
            "Performed code reviews and collaborated with cross-functional teams.",
          ],
        },
        {
          period: "2019 - 2021",
          role: "Junior Front-end Developer",
          company: "Jüssi",
          details: [
            "Developed and maintained digital platforms for major Brazilian organizations including Itaú, Honda, and Órigo.",
            "Built responsive interfaces and implemented new platform features.",
            "Participated in debugging, maintenance, and continuous improvement initiatives.",
          ],
        },
        {
          period: "2018 - 2019",
          role: "Web Development Intern",
          company: "Jüssi",
          details: [
            "Developed and maintained digital platforms for major Brazilian organizations including Itaú, Honda, and Órigo.",
            "Built responsive interfaces and implemented new platform features.",
            "Participated in debugging, maintenance, and continuous improvement initiatives.",
            "Daily development of an average of 5 responsive marketing email templates using HTML and CSS, with a direct impact on tens of thousands of customers daily.",
          ],
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
      previous: "Previous project",
      next: "Next project",
      close: "Close project details",
      details: {
        role: "Role",
        challenge: "Challenge",
        solution: "Solution",
        impact: "Impact",
      },
    },
    demos: {
      eyebrow: "Demos",
      title: "Interactive prototypes with real product behavior.",
    },
    projectItems: [
      {
        title: "KitchenAid Brazil - Instagram Stories-like Component",
        category: "Enterprise e-commerce",
        description: "A VTEX component inspired by Instagram Stories, created to highlight product content and campaign narratives in a familiar, tappable format.",
        role: "Front-end development and reusable component implementation",
        challenge: "Bring a social-media-inspired interaction pattern into an enterprise storefront without losing responsiveness, performance, or brand consistency.",
        solution: "Built a reusable front-end component for VTEX with responsive behavior, image-focused presentation, and interaction patterns familiar to mobile shoppers.",
        impact: "Created a richer product discovery experience for KitchenAid Brazil campaigns and brand storytelling.",
        stack: ["VTEX IO", "React", "TypeScript", "CSS", "Reusable Components"],
        url: "https://www.kitchenaid.com.br/",
      },
      {
        title: "KitchenAid Brazil - Custom Checkout VTEX",
        category: "Custom checkout",
        description: "A customized VTEX checkout experience for KitchenAid Brazil, focused on interface refinements, mobile usability, and a clearer purchase flow.",
        role: "Front-end development and checkout interface customization",
        challenge: "Adapt the VTEX checkout experience to feel more polished, brand-aligned, and easy to use across devices.",
        solution: "Implemented checkout customizations with responsive CSS and front-end adjustments for key purchase-flow screens.",
        impact: "Improved the checkout presentation and usability for a production enterprise e-commerce operation.",
        stack: ["VTEX Checkout", "JavaScript", "CSS", "Responsive UI", "E-commerce"],
        url: "https://www.kitchenaid.com.br/checkout",
      },
      {
        title: "FLPsicoFlow",
        category: "SaaS Web",
        description: "A SaaS web app for psychologists to manage patients, sessions, schedule, and finances.",
        role: "Product design, front-end development and Supabase integration",
        challenge: "Create a focused management tool for psychologists to organize patient records, sessions, scheduling and financial routines.",
        solution: "Built a responsive Next.js interface connected to Supabase, with structured views for daily clinical and administrative workflows.",
        impact: "Delivered a practical SaaS foundation that centralizes core practice-management tasks in one web app.",
        stack: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
        url: "https://flpsicoflow-v1.vercel.app/",
      },
      {
        title: "Centro Veterinário Linda-a-Velha",
        category: "Institutional website",
        description: "Institutional website for a veterinary clinic in Portugal, focused on clear service presentation, responsive layout, local credibility and a friendly digital experience for pet owners.",
        role: "Front-end development, responsive interface and institutional content structure",
        challenge: "Present the clinic services with clarity, local trust and an accessible experience for pet owners across devices.",
        solution: "Created a responsive institutional website with service-focused sections, friendly visual hierarchy and deployment-ready implementation.",
        impact: "Gave the clinic a clearer digital presence for service discovery, credibility and contact conversion.",
        stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub", "Vercel"],
        url: "#",
      },
      {
        title: "Villa Mu",
        category: "MMORPG Game Platform",
        description: "Website for Villa Mu, an MMORPG private server, featuring player account area, rankings, referral rewards, event schedules, and payment integrations.",
        role: "Frontend, backend integrations and product features",
        challenge: "Create a complete player platform with account area, rankings, rewards and payment flows.",
        solution: "Built user-facing pages, referral rewards, SQL Server integrations, and payment workflows using Mercado Pago and Stripe.",
        impact: "Live product with real users, real transactions and ongoing feature development.",
        stack: ["PHP", "SQL Server", "JavaScript", "CSS", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Collaborations",
      title: "Selected Brands & Collabs",
      imageAlt: "visual work preview",
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
          name: "Jüssi",
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
      imageAlt: "thumbnail preview",
      galleryLabel: "Thumbnail gallery",
      previous: "Previous thumbnails",
      next: "Next thumbnails",
      expand: "Expand",
      close: "Close image preview",
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
      groups: sharedSkillsEn,
      toolsTitle: "Tools",
      tools: sharedToolsEn,
    },
    links: {
      eyebrow: "Links",
      title: "Let's build something together.",
      description: "Available for front-end opportunities and projects, creating responsive, high-performance interfaces that stay true to the design.",
      items: [
        { label: "Email", href: "mailto:silviocardos@hotmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/silviocardoso/" },
        { label: "GitHub", href: "https://github.com/silviocardosodev" },
        { label: "WhatsApp", href: "https://wa.me/5511958060039" },
      ],
    },
  },
  pt: {
    language: { en: "EN", pt: "PT", aria: "Trocar idioma" },
    navigation: [
      { href: "#hero", label: "Início" },
      { href: "#summary", label: "Sobre mim" },
      { href: "#projects", label: "Projetos" },
      { href: "#demos", label: "Demos" },
      { href: "#collabs", label: "Colaborações" },
      { href: "#design-work", label: "Design" },
      { href: "#skills", label: "Habilidades" },
      { href: "#links", label: "Links" },
    ],
    hero: {
      status: "Disponível para trabalho",
      intro: "Portfólio 2026",
      name: "Silvio Cardoso",
      role: heroRolePt,
      description:
        "Crio interfaces digitais refinadas, com olhar forte para layout, interação e presença de marca.",
      contact: "Entrar em contato",
      experience: "Ver experiência",
      cv: "Baixar CV",
      scroll: "Rolar",
    },
    summary: {
      eyebrow: "Sobre mim",
      title: "Um pouco da minha história",
      paragraphs: [
        "Sou um desenvolvedor front-end e designer gráfico brasileiro com mais de cinco anos de experiência criando produtos digitais responsivos e de alta performance.",
        "Minha trajetória combina Ciência da Computação, design gráfico e experiência prática com projetos reais. Comecei minha carreira profissional em desenvolvimento web na Jüssi e, desde então, trabalhei com times multidisciplinares e grandes marcas como KitchenAid, Itaú e Honda, desenvolvendo interfaces acessíveis, responsivas e reutilizáveis.",
        "Hoje, trabalho principalmente com React e TypeScript, com forte foco em arquitetura de componentes, performance e experiência do usuário. Atualmente curso um mestrado na Califórnia, ampliando minha perspectiva técnica e orientada a produto.",
      ],
      funFactsTitle: "Curiosidades",
      funFacts: [
        "Torcedor do São Paulo Futebol Clube",
        "Torcedor da Mercedes na F1",
        "Gosto de tocar violão",
        "Adoro jogar F1, e até abri um canal no YouTube para isso",
        "Já tive uma banda na escola",
        "Adoro churrasco e hambúrguer",
      ],
      actionsLabel: "Ações do portfólio",
      quickTalk: "Conversa rápida",
    },
    experience: {
      eyebrow: "Experiência",
      title: "Experiência profissional criando produtos front-end escaláveis para grandes marcas.",
      items: [
        {
          period: "2021 - 2024",
          role: "Mid-level Front-end Developer",
          company: "Jüssi",
          details: [
            "Desenvolvimento e manutenção de soluções de e-commerce em larga escala para KitchenAid Brasil (Whirlpool Corporation) usando React e VTEX IO.",
            "Contribuição para padrões de arquitetura front-end, bibliotecas de componentes reutilizáveis e boas práticas de engenharia.",
            "Participação em iniciativas de qualidade, manutenção e escalabilidade de software.",
            "Melhoria de performance do site em 72% por meio de otimização front-end e refatoração da arquitetura CSS.",
            "Desenvolvimento de experiências customizadas de checkout e área do cliente.",
            "Realização de code reviews e colaboração com times multidisciplinares.",
          ],
        },
        {
          period: "2019 - 2021",
          role: "Junior Front-end Developer",
          company: "Jüssi",
          details: [
            "Desenvolvimento e manutenção de plataformas digitais para grandes organizações brasileiras, incluindo Itaú, Honda e Órigo.",
            "Criação de interfaces responsivas e implementação de novas funcionalidades de plataforma.",
            "Participação em iniciativas de debugging, manutenção e melhoria contínua.",
          ],
        },
        {
          period: "2018 - 2019",
          role: "Web Development Intern",
          company: "Jüssi",
          details: [
            "Desenvolvimento e manutenção de plataformas digitais para grandes organizações brasileiras, incluindo Itaú, Honda e Órigo.",
            "Criação de interfaces responsivas e implementação de novas funcionalidades de plataforma.",
            "Participação em iniciativas de debugging, manutenção e melhoria contínua.",
            "Desenvolvimento diário de uma média de 5 templates responsivos de e-mail marketing usando HTML e CSS, com impacto direto em dezenas de milhares de clientes diariamente.",
          ],
        },
      ],
    },
    education: {
      eyebrow: "Escolaridade",
      title: "Formação acadêmica conectando software, sistemas e tecnologia aplicada.",
      items: [
        {
          institution: "Caroline University",
          degree: "Mestrado em Sistemas de Informação (Em andamento)",
          location: "California, Estados Unidos",
          description:
            "Estudos de pós-graduação com foco em sistemas de informação, engenharia de software, transformação digital, tomada de decisões baseada em dados e tecnologias emergentes.",
        },
        {
          institution: "Universidade Nove de Julho",
          degree: "Bacharelado em Ciência da Computação",
          location: "Brasil",
          description:
            "Formação completa em desenvolvimento de software, sistemas de computadores, algoritmos, engenharia de software, bancos de dados e tecnologia da informação.",
        },
        {
          institution: "Instituto Federal de Goiás",
          degree: "Curso Técnico em Suporte e Manutenção de Computadores",
          location: "Brasil",
          description:
            "Formação técnica em sistemas de computadores, manutenção de hardware, fundamentos de redes e suporte em tecnologia da informação.",
        },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Projetos selecionados com clareza, velocidade e impacto visual.",
      visit: "Ver projeto",
      previous: "Projeto anterior",
      next: "Próximo projeto",
      close: "Fechar detalhes do projeto",
      details: {
        role: "Função",
        challenge: "Desafio",
        solution: "Solução",
        impact: "Impacto",
      },
    },
    demos: {
      eyebrow: "Demos",
      title: "Protótipos interativos com comportamento real de produto.",
    },
    projectItems: [
      {
        title: "KitchenAid Brasil - Componente similar aos Stories do Instagram",
        category: "E-commerce corporativo",
        description: "Componente em VTEX inspirado nos Stories do Instagram, criado para destacar conteúdos de produto e campanhas em um formato familiar e interativo.",
        role: "Desenvolvimento front-end e implementação de componente reutilizável",
        challenge: "Levar um padrão de interação inspirado em redes sociais para uma loja corporativa sem perder responsividade, performance ou consistência de marca.",
        solution: "Construção de um componente front-end reutilizável para VTEX, com comportamento responsivo, apresentação focada em imagem e interação familiar para usuários em dispositivos móveis.",
        impact: "Criação de uma experiência mais rica para descoberta de produtos, campanhas e storytelling da KitchenAid Brasil.",
        stack: ["VTEX IO", "React", "TypeScript", "CSS", "Componentes Reutilizáveis"],
        url: "https://www.kitchenaid.com.br/",
      },
      {
        title: "KitchenAid Brasil - Checkout VTEX Customizado",
        category: "Checkout customizado",
        description: "Experiência de checkout customizada em VTEX para KitchenAid Brasil, com foco em refinamentos de interface, usabilidade em dispositivos móveis e clareza no fluxo de compra.",
        role: "Desenvolvimento front-end e customização de interface de checkout",
        challenge: "Adaptar o checkout VTEX para uma experiência mais polida, alinhada à marca e fácil de usar em diferentes dispositivos.",
        solution: "Implementação de customizações no checkout com CSS responsivo e ajustes front-end nas principais telas do fluxo de compra.",
        impact: "Melhoria na apresentação e usabilidade do checkout em uma operação corporativa de e-commerce em produção.",
        stack: ["VTEX Checkout", "JavaScript", "CSS", "UI Responsiva", "E-commerce"],
        url: "https://www.kitchenaid.com.br/checkout",
      },
      {
        title: "FLPsicoFlow",
        category: "SaaS Web",
        description: "SaaS web para psicólogas gerenciarem pacientes, sessões, agenda e finanças.",
        role: "Design de produto, desenvolvimento front-end e integração com Supabase",
        challenge: "Criar uma ferramenta de gestão focada para psicólogas organizarem pacientes, sessões, agenda e rotinas financeiras.",
        solution: "Construção de uma interface responsiva em Next.js conectada ao Supabase, com visões estruturadas para fluxos clínicos e administrativos do dia a dia.",
        impact: "Entrega de uma base SaaS prática que centraliza tarefas essenciais de gestão em uma única aplicação web.",
        stack: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
        url: "https://flpsicoflow-v1.vercel.app/",
      },
      {
        title: "Centro Veterinário Linda-a-Velha",
        category: "Site institucional",
        description: "Site institucional para uma clínica veterinária em Portugal, com foco em apresentação clara dos serviços, layout responsivo, credibilidade local e uma experiência digital amigável para tutores de pets.",
        role: "Desenvolvimento front-end, interface responsiva e estrutura de conteúdo institucional",
        challenge: "Apresentar os serviços da clínica com clareza, confiança local e uma experiência acessível para tutores em diferentes dispositivos.",
        solution: "Criação de um site institucional responsivo com seções focadas em serviços, hierarquia visual amigável e implementação pronta para publicação.",
        impact: "Fortalecimento da presença digital da clínica para descoberta de serviços, credibilidade e conversão de contatos.",
        stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub", "Vercel"],
        url: "#",
      },
      {
        title: "Villa Mu",
        description: "Site para a Villa Mu (Jogo MMORPG) com área logada do jogador, exibição de rankings, sistema de indicações e integrações de pagamento.",
        category: "Plataforma de jogo MMORPG",
        role: "Front-end, integrações back-end e funcionalidades de produto",
        challenge: "Criar uma plataforma completa para jogadores com área logada, rankings, recompensas e fluxos de pagamento.",
        solution: "Construção das páginas do jogador, recompensas por indicação, integrações com SQL Server e pagamentos com Mercado Pago e Stripe.",
        impact: "Produto em produção com usuários reais, transações reais e evolução contínua de funcionalidades.",
        stack: ["PHP", "SQL Server", "JavaScript", "CSS", "Mercado Pago", "Stripe"],
        url: "https://villamu.com.br/",
      },
    ],
    brands: {
      eyebrow: "Colaborações",
      title: "Marcas e colaborações selecionadas",
      imageAlt: "prévia de trabalho visual",
      items: [
        {
          name: "KitchenAid Brasil",
          description: "Front-end e produto digital para uma experiência corporativa de e-commerce.",
        },
        {
          name: "Honda",
          description: "Design visual e digital para materiais de comunicação relacionados à marca.",
        },
        {
          name: "Itaú",
          description: "Design gráfico e materiais digitais para projetos de comunicação de marca.",
        },
        {
          name: "Órigo Energia",
          description: "Design visual e digital para materiais de comunicação de energia renovável.",
        },
        {
          name: "Jüssi",
          description: "Trabalho digital e visual conectado a iniciativas de produto, marca e comunicação.",
        },
        {
          name: "M7A7",
          description: "Materiais visuais e peças de marca para projetos de comunicação digital.",
        },
      ],
    },
    designWork: {
      eyebrow: "Design",
      title: "Thumbnails de YouTube e materiais visuais criados para chamar atenção.",
      visit: "Ver canal",
      imageAlt: "prévia de thumbnail",
      galleryLabel: "Galeria de thumbnails",
      previous: "Thumbnails anteriores",
      next: "Próximas thumbnails",
      expand: "Expandir",
      close: "Fechar prévia da imagem",
      items: [
        {
          name: "Rique Paiva",
          category: "Thumbnails de YouTube",
          description: "Comecei antes do canal chegar a 1 mil inscritos. Hoje, o canal tem mais de 251 mil inscritos, com thumbnails e materiais visuais criados para gerar atenção, clareza e crescimento.",
          url: "https://www.youtube.com/@CanalDoRique7/videos",
          tone: "red",
        },
        {
          name: "Jotinha TV",
          category: "Thumbnails de YouTube",
          description: "De Shorts a conteúdos longos, o Jotinha TV passou a usar minhas thumbnails para criar ganchos visuais mais fortes, títulos mais claros e apresentações de vídeo mais clicáveis.",
          url: "https://www.youtube.com/@JotinhaTV_/videos",
          tone: "gold",
        },
      ],
    },
    skills: {
      eyebrow: "Habilidades",
      title: "Ferramentas e práticas que uso para levar uma ideia até a interface final.",
      groups: sharedSkillsPt,
      toolsTitle: "Ferramentas",
      tools: sharedToolsPt,
    },
    links: {
      eyebrow: "Links",
      title: "Vamos construir algo juntos.",
      description: "Disponível para oportunidades e projetos de front-end, criando interfaces responsivas, performáticas e fiéis ao design.",
      items: [
        { label: "Email", href: "mailto:silviocardos@hotmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/silviocardoso/" },
        { label: "GitHub", href: "https://github.com/silviocardosodev" },
        { label: "WhatsApp", href: "https://wa.me/5511958060039" },
      ],
    },
  },
} as const;
