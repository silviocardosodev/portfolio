import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import flpsicoflowImage from "@/assets/img/flpsicoflow.webp";
import centroVeterinarioImage from "@/assets/img/centroveterinario.webp";
import kitchenaidCheckoutImage from "@/assets/img/kitchenaid-customcheckout.webp";
import thumbBarcelona from "@/assets/img/canaldorique-barcelona.webp";
import thumbCucurella from "@/assets/img/canaldorique-cucurella.webp";
import thumbNeymar from "@/assets/img/jotinhatv-neymar.webp";
import thumbSpfc from "@/assets/img/jotinhatv-spfc.webp";

const pageTitle = "Criação de Sites para Psicólogos e Profissionais da Saúde";
const pageDescription =
  "Sites profissionais, rápidos e prontos para o Google para psicólogos, terapeutas, clínicas e profissionais autônomos. Também crio thumbnails para YouTube. Orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: `${pageTitle} | Silvio Cardoso`,
    description: pageDescription,
    url: "/servicos",
    locale: "pt_BR",
    type: "website",
  },
  keywords: [
    "criação de site para psicólogo",
    "site para psicóloga",
    "site para clínica",
    "site para profissional da saúde",
    "criação de sites",
    "landing page",
    "thumbnail para youtube",
  ],
};

const whatsappNumber = "5511958060039";

function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const audiences = [
  "Psicólogos e terapeutas",
  "Nutricionistas e fisioterapeutas",
  "Clínicas e consultórios",
  "Dentistas e veterinários",
  "Advogados e contadores",
  "Profissionais autônomos em geral",
];

const sitePlans = [
  {
    name: "Site Essencial",
    price: "R$ 490",
    note: "pagamento único",
    description: "Uma página completa para apresentar seu trabalho e receber contatos pelo WhatsApp.",
    features: [
      "Página única com seções sob medida",
      "Botão de WhatsApp e agendamento",
      "Layout responsivo para celular",
      "Configuração para aparecer no Google",
      "Entrega em até 7 dias",
    ],
    highlight: false,
  },
  {
    name: "Site Profissional",
    price: "R$ 990",
    note: "pagamento único",
    description: "Para quem quer passar mais autoridade e ser encontrado por quem pesquisa no Google.",
    features: [
      "Até 5 páginas (sobre, serviços, contato...)",
      "Blog para artigos e dicas",
      "SEO local para a sua cidade",
      "Integração com Google Maps e Instagram",
      "Entrega em até 15 dias",
    ],
    highlight: true,
  },
  {
    name: "Manutenção",
    price: "R$ 79",
    note: "por mês",
    description: "Seu site sempre no ar e atualizado, sem você se preocupar com nada técnico.",
    features: [
      "Hospedagem e domínio gerenciados",
      "Alterações de texto e fotos",
      "Backup e monitoramento",
      "Suporte direto pelo WhatsApp",
    ],
    highlight: false,
  },
] as const;

const thumbnailPlans = [
  { name: "Thumbnail avulsa", price: "R$ 35", detail: "1 thumbnail, entrega em até 48h" },
  { name: "Pacote 5 thumbnails", price: "R$ 150", detail: "R$ 30 cada, ideal para a semana de vídeos" },
  { name: "Plano mensal", price: "Sob consulta", detail: "Para canais que postam com frequência" },
] as const;

const projects = [
  {
    title: "FLPsicoFlow",
    category: "Sistema para psicólogas",
    description: "Plataforma para gerenciar pacientes, sessões, agenda e finanças do consultório.",
    image: flpsicoflowImage,
    url: "https://flpsicoflow-v1.vercel.app/",
  },
  {
    title: "Centro Veterinário Linda-a-Velha",
    category: "Site institucional",
    description: "Site para clínica veterinária em Portugal, com serviços claros e credibilidade local.",
    image: centroVeterinarioImage,
    url: null,
  },
  {
    title: "KitchenAid Brasil",
    category: "E-commerce de grande marca",
    description: "Checkout customizado e componentes interativos para a loja oficial da marca.",
    image: kitchenaidCheckoutImage,
    url: "https://www.kitchenaid.com.br/",
  },
] as const;

const thumbnails = [
  { image: thumbBarcelona, alt: "Thumbnail para o Canal do Rique sobre o Barcelona" },
  { image: thumbNeymar, alt: "Thumbnail para o Jotinha TV sobre o Neymar" },
  { image: thumbCucurella, alt: "Thumbnail para o Canal do Rique sobre o Cucurella" },
  { image: thumbSpfc, alt: "Thumbnail para o Jotinha TV sobre o São Paulo" },
] as const;

const steps = [
  { title: "Conversa", text: "Você me chama no WhatsApp e conta sobre o seu trabalho e o que precisa." },
  { title: "Proposta", text: "Envio o pacote ideal, o prazo e o valor fechado. Sem surpresas." },
  { title: "Criação", text: "Desenvolvo o site e mostro uma prévia para você pedir ajustes." },
  { title: "No ar", text: "Publico o site, configuro o Google e você começa a receber contatos." },
] as const;

const faqs = [
  {
    question: "Preciso entender de tecnologia?",
    answer: "Não. Eu cuido de tudo: domínio, hospedagem, textos, layout e publicação. Você só aprova.",
  },
  {
    question: "O site vai aparecer no Google?",
    answer:
      "Sim. Todo site sai configurado para ser encontrado (Search Console, título, descrição e SEO local). Posicionar bem em buscas concorridas leva algumas semanas.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Normalmente 50% para começar e 50% na entrega, via Pix. A manutenção é mensal e pode ser cancelada quando quiser.",
  },
  {
    question: "E se eu já tiver um site?",
    answer: "Posso redesenhar o site atual, deixá-lo mais rápido e adaptado para celular, mantendo o seu domínio.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Silvio Cardoso | Criação de Sites",
  url: "https://silviocardoso.dev/servicos",
  description: pageDescription,
  areaServed: "BR",
  availableLanguage: "pt-BR",
  priceRange: "R$ 35 - R$ 990",
  serviceType: ["Criação de sites", "Landing pages", "Thumbnails para YouTube"],
};

export default function ServicesPage() {
  return (
    <main className="services" lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="services__topbar">
        <Link className="services__back" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Portfólio</span>
        </Link>
        <a
          className="button button--red services__topbar-cta"
          href={whatsappLink("Olá, Silvio! Vi seu site e quero um orçamento.")}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </header>

      <section className="services__hero" aria-labelledby="services-title">
        <p className="services__eyebrow">Serviços</p>
        <h1 className="services__title" id="services-title">
          Sites que trazem pacientes e clientes até você
        </h1>
        <p className="services__lead">
          Crio sites profissionais, rápidos e prontos para o Google para psicólogos, clínicas e profissionais
          autônomos. Experiência em projetos para marcas como KitchenAid, agora a serviço do seu consultório.
        </p>
        <div className="services__actions">
          <a
            className="button button--red"
            href={whatsappLink("Olá, Silvio! Quero um orçamento de site.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>Pedir orçamento</span>
          </a>
          <a className="button button--white" href="#pacotes">
            <span>Ver pacotes</span>
          </a>
        </div>
        <ul className="services__audiences" aria-label="Para quem eu crio sites">
          {audiences.map((audience) => (
            <li className="services__audience" key={audience}>
              {audience}
            </li>
          ))}
        </ul>
      </section>

      <section className="services__block" id="pacotes" aria-labelledby="pacotes-title">
        <p className="services__eyebrow">Pacotes de sites</p>
        <h2 className="services__heading" id="pacotes-title">
          Escolha o ideal para o seu momento
        </h2>
        <div className="services__plans">
          {sitePlans.map((plan) => (
            <article className={`services__plan ${plan.highlight ? "services__plan--highlight" : ""}`} key={plan.name}>
              {plan.highlight ? <p className="services__badge">Mais procurado</p> : null}
              <h3 className="services__plan-name">{plan.name}</h3>
              <p className="services__plan-price">
                <span className="services__plan-from">a partir de</span>
                <strong>{plan.price}</strong>
                <span className="services__plan-note">{plan.note}</span>
              </p>
              <p className="services__plan-description">{plan.description}</p>
              <ul className="services__features">
                {plan.features.map((feature) => (
                  <li className="services__feature" key={feature}>
                    <Check size={16} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`button ${plan.highlight ? "button--red" : "button--ghost"} services__plan-cta`}
                href={whatsappLink(`Olá, Silvio! Tenho interesse no pacote ${plan.name}.`)}
                target="_blank"
                rel="noreferrer"
              >
                <span>Quero este</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="services__block" aria-labelledby="projetos-title">
        <p className="services__eyebrow">Trabalhos</p>
        <h2 className="services__heading" id="projetos-title">
          Projetos que já desenvolvi
        </h2>
        <div className="services__projects">
          {projects.map((project) => {
            const content = (
              <>
                <div className="services__project-media">
                  <Image
                    src={project.image}
                    alt={`Prévia do projeto ${project.title}`}
                    sizes="(max-width: 860px) 100vw, 33vw"
                    className="services__project-image"
                  />
                </div>
                <div className="services__project-body">
                  <p className="services__project-category">{project.category}</p>
                  <h3 className="services__project-title">
                    {project.title}
                    {project.url ? <ArrowUpRight size={18} aria-hidden="true" /> : null}
                  </h3>
                  <p className="services__project-description">{project.description}</p>
                </div>
              </>
            );

            return project.url ? (
              <a className="services__project" href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                {content}
              </a>
            ) : (
              <article className="services__project" key={project.title}>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="services__block" id="thumbnails" aria-labelledby="thumbnails-title">
        <p className="services__eyebrow">Thumbnails para YouTube</p>
        <h2 className="services__heading" id="thumbnails-title">
          Thumbnails que fazem as pessoas clicarem
        </h2>
        <p className="services__text">
          Comecei a criar as thumbnails do Canal do Rique quando ele tinha menos de 1 mil inscritos. Hoje são mais
          de 251 mil. Também crio para o Jotinha TV, de Shorts a vídeos longos.
        </p>
        <div className="services__thumbs">
          {thumbnails.map((thumb) => (
            <div className="services__thumb" key={thumb.alt}>
              <Image src={thumb.image} alt={thumb.alt} sizes="(max-width: 860px) 50vw, 25vw" className="services__thumb-image" />
            </div>
          ))}
        </div>
        <div className="services__thumb-plans">
          {thumbnailPlans.map((plan) => (
            <a
              className="services__thumb-plan"
              href={whatsappLink(`Olá, Silvio! Quero saber mais sobre: ${plan.name}.`)}
              target="_blank"
              rel="noreferrer"
              key={plan.name}
            >
              <span className="services__thumb-plan-name">{plan.name}</span>
              <strong className="services__thumb-plan-price">{plan.price}</strong>
              <span className="services__thumb-plan-detail">{plan.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="services__block" aria-labelledby="processo-title">
        <p className="services__eyebrow">Como funciona</p>
        <h2 className="services__heading" id="processo-title">
          Do primeiro contato ao site no ar
        </h2>
        <ol className="services__steps">
          {steps.map((step, index) => (
            <li className="services__step" key={step.title}>
              <span className="services__step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="services__step-title">{step.title}</h3>
              <p className="services__step-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="services__block" aria-labelledby="faq-title">
        <p className="services__eyebrow">Dúvidas</p>
        <h2 className="services__heading" id="faq-title">
          Perguntas frequentes
        </h2>
        <div className="services__faq">
          {faqs.map((faq) => (
            <details className="services__faq-item" key={faq.question}>
              <summary className="services__faq-question">{faq.question}</summary>
              <p className="services__faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="services__final" aria-labelledby="final-title">
        <h2 className="services__heading" id="final-title">
          Vamos colocar o seu trabalho na internet?
        </h2>
        <p className="services__text">Me chama no WhatsApp. O orçamento é gratuito e sem compromisso.</p>
        <a
          className="button button--red"
          href={whatsappLink("Olá, Silvio! Quero um orçamento.")}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span>Falar no WhatsApp</span>
        </a>
      </section>
    </main>
  );
}
