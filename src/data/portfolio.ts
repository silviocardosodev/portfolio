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
    items: ["Design de Interface", "Wireframing", "Prototipação", "Design Systems", "Design Responsivo"],
  },
  {
    title: "Produtos Digitais",
    items: ["Componentes Reutilizáveis", "Otimização de Performance", "Interfaces SaaS", "Painéis Administrativos"],
  },
  {
    title: "E-commerce & Integrações",
    items: ["VTEX", "PHP", "SQL Server", "Supabase", "PostgreSQL", "Stripe", "Mercado Pago"],
  },
  {
    title: "Design Visual",
    items: ["Design Gráfico", "Thumbnails de YouTube", "Assets para Redes Sociais", "Materiais de Marca"],
  },
  {
    title: "Workflow",
    items: ["GitHub", "Vercel", "cPanel", "Desenvolvimento com IA"],
  },
] as const;

const sharedToolsEn = ["Figma", "Photoshop", "Illustrator", "VS Code", "GitHub", "Vercel", "Supabase", "VTEX", "cPanel", "AI Tools"] as const;
const sharedToolsPt = ["Figma", "Photoshop", "Illustrator", "VS Code", "GitHub", "Vercel", "Supabase", "VTEX", "cPanel", "Ferramentas de IA"] as const;

export const portfolioCopy = {
  en: {
    language: { en: "EN", pt: "PT", aria: "Change language" },
    navigation: [
      { href: "#hero", label: "Hero" },
      { href: "#summary", label: "About Me" },
      { href: "#projects", label: "Projects" },
      { href: "#collabs", label: "Collabs" },
      { href: "#design-work", label: "Design Work" },
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
      paragraphs: [
        "I've always had a strong connection with technology. Since childhood, computers and video games have sparked my curiosity, and every moment spent in this universe has only increased my interest. I was influenced by my uncle, who is a programmer, to pursue a career in IT.",
        "At 13, I had my first professional experience as a graphic designer at a company in my hometown. Due to my age, I needed to end this phase, but it was there that I began to understand how much I enjoyed creating visual and digital solutions.",
        "Over time, I completed my training in Computer Support and Maintenance, graduated in Computer Science, and am currently pursuing a master's degree in California, an important step for both my personal life and my career.",
        "My web development journey began more concretely during an internship at Jüssi, in Brazil. Before that, I had already studied on my own, following courses and content on YouTube simply out of interest in learning and evolving in the field.",
        "Since then, my passion for technology and design has only grown. I have had the opportunity to work with large companies, good professionals, and real projects, developing an increasingly keen eye for well-built, responsive, reusable digital products designed especially for the user experience.",
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
    },
    projectItems: [
      {
        title: "KitchenAid Brasil",
        category: "Enterprise e-commerce",
        description: "An enterprise VTEX e-commerce experience for a global brand, focused on front-end, components, CSS, and the shopping experience.",
        role: "Front-end development, component implementation and e-commerce interface refinements",
        challenge: "Support a large-scale commerce experience with consistent components, responsive layouts and a polished shopping flow.",
        solution: "Worked on VTEX IO front-end pieces, reusable React components, styling, layout adjustments and checkout-related interface improvements.",
        impact: "Contributed to a production enterprise storefront for a global brand with a clearer, more consistent buying experience.",
        stack: ["VTEX IO", "React", "TypeScript", "JavaScript", "Reusable Components", "VTEX Checkout"],
        url: "https://www.kitchenaid.com.br/",
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
      groups: sharedSkillsEn,
      toolsTitle: "Tools",
      tools: sharedToolsEn,
    },
    links: {
      eyebrow: "Links",
      title: "Let's build something with presence.",
      description: "Available for front-end work, design collaboration, and portfolio or brand-focused web projects.",
      items: [
        { label: "Email", href: "mailto:hello@silviocardoso.dev" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/silviocardoso/" },
        { label: "GitHub", href: "https://github.com/silviocardosodev" },
        { label: "WhatsApp", href: "https://wa.me/5511958060039" },
      ],
    },
  },
  pt: {
    language: { en: "EN", pt: "PT", aria: "Trocar idioma" },
    navigation: [
      { href: "#hero", label: "Hero" },
      { href: "#summary", label: "Sobre mim" },
      { href: "#projects", label: "Projetos" },
      { href: "#collabs", label: "Colaborações" },
      { href: "#design-work", label: "Design" },
      { href: "#skills", label: "Habilidades" },
      { href: "#links", label: "Links" },
    ],
    hero: {
      status: "Open to work",
      intro: "Portfolio 2026",
      name: "Silvio Cardoso",
      role: "Front-end Developer / Graphic Designer",
      description:
        "Crio interfaces digitais refinadas, com olhar forte para layout, interação e presença de marca.",
      contact: "Entrar em contato",
      cv: "Baixar CV",
      scroll: "Rolar",
    },
    summary: {
      eyebrow: "Sobre mim",
      title: "Sobre mim",
      paragraphs: [
        "Sempre tive uma forte conexão com tecnologia. Desde criança, computadores e videogames despertavam minha curiosidade, e cada momento envolvido com esse universo tornava meu interesse ainda maior. Fui influenciado pelo meu tio, que é programador, a seguir carreira na área de TI.",
        "Aos 13 anos, tive minha primeira experiência profissional como designer gráfico em uma empresa da minha cidade natal. Por conta da minha idade, precisei encerrar essa etapa, mas foi ali que comecei a entender o quanto gostava de criar soluções visuais e digitais.",
        "Com o tempo, concluí minha formação em Suporte e Manutenção de Computadores, me graduei em Ciência da Computação e atualmente curso um mestrado na Califórnia, um passo importante tanto para minha vida pessoal quanto para minha carreira.",
        "Minha trajetória em desenvolvimento web começou de forma mais concreta durante um estágio na Jüssi, no Brasil. Antes disso, eu já estudava por conta própria, acompanhando cursos e conteúdos no YouTube simplesmente pelo interesse em aprender e evoluir na área.",
        "Desde então, minha paixão por tecnologia e design só cresceu. Tive a oportunidade de trabalhar com grandes empresas, bons profissionais e projetos reais, desenvolvendo um olhar cada vez mais atento para produtos digitais bem construídos, responsivos, reutilizáveis e pensados especialmente para a experiência do usuário.",
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
      title: "Trabalhos selecionados com clareza, velocidade e impacto visual.",
      visit: "Ver projeto",
    },
    projectItems: [
      {
        title: "KitchenAid Brasil",
        category: "E-commerce enterprise",
        description: "E-commerce enterprise em VTEX para marca global, com foco em front-end, componentes, CSS e experiência de compra.",
        role: "Desenvolvimento front-end, implementação de componentes e refinamentos de interface para e-commerce",
        challenge: "Apoiar uma experiência de comércio em grande escala com componentes consistentes, layouts responsivos e uma jornada de compra polida.",
        solution: "Atuação em partes front-end no VTEX IO, componentes React reutilizáveis, estilização, ajustes de layout e melhorias de interface relacionadas ao checkout.",
        impact: "Contribuição para uma loja enterprise em produção de uma marca global, com experiência de compra mais clara e consistente.",
        stack: ["VTEX IO", "React", "TypeScript", "JavaScript", "Componentes Reutilizáveis", "VTEX Checkout"],
        url: "https://www.kitchenaid.com.br/",
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
        solution: "Criação de um site institucional responsivo com seções focadas em serviços, hierarquia visual amigável e implementação pronta para deploy.",
        impact: "Fortalecimento da presença digital da clínica para descoberta de serviços, credibilidade e conversão de contatos.",
        stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub", "Vercel"],
        url: "#",
      },
      {
        title: "Villa Mu",
        category: "MMORPG Game Platform",
        description: "Site para a Villa Mu (Jogo MMORPG) com área logada do jogador, exibição de rankings, sistema de indicações e integrações de pagamento.",
        role: "Frontend, integrações backend e funcionalidades de produto",
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
      items: [
        {
          name: "KitchenAid Brasil",
          description: "Front-end e produto digital para uma experiência de e-commerce enterprise.",
        },
        {
          name: "Honda",
          description: "Design visual e digital para materiais de comunicação relacionados à marca.",
        },
        {
          name: "Itaú",
          description: "Design gráfico e assets digitais para projetos de comunicação de marca.",
        },
        {
          name: "Órigo Energia",
          description: "Design visual e digital para materiais de comunicação de energia renovável.",
        },
        {
          name: "Jussi",
          description: "Trabalho digital e visual conectado a iniciativas de produto, marca e comunicação.",
        },
        {
          name: "M7A7",
          description: "Assets visuais e materiais de marca para projetos de comunicação digital.",
        },
      ],
    },
    designWork: {
      eyebrow: "Design Work",
      title: "Thumbnails de YouTube e assets visuais criados para chamar atenção.",
      visit: "Ver canal",
      items: [
        {
          name: "Rique Paiva",
          category: "Thumbnails de YouTube",
          description: "Comecei antes do canal chegar a 1 mil inscritos. Hoje, o canal tem mais de 251 mil inscritos, com thumbnails e assets visuais criados para atenção, clareza e crescimento.",
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
      title: "Vamos criar algo com presença.",
      description: "Disponível para front-end, colaborações de design e projetos web focados em portfólio ou marca.",
      items: [
        { label: "Email", href: "mailto:hello@silviocardoso.dev" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/silviocardoso/" },
        { label: "GitHub", href: "https://github.com/silviocardosodev" },
        { label: "WhatsApp", href: "https://wa.me/5511958060039" },
      ],
    },
  },
} as const;
