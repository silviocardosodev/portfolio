import { Link2, Mail, MessageCircle } from "lucide-react";

const quickLinks = [
  {
    href: "mailto:silviocardos@hotmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://wa.me/5511958060039",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "https://www.linkedin.com/in/silviocardoso/",
    icon: Link2,
    label: "LinkedIn",
  },
];

export function QuickContactLinks() {
  return (
    <div className="quick-contact" aria-label="Contact links">
      {quickLinks.map((item) => {
        const Icon = item.icon;
        const isExternal = !item.href.startsWith("mailto:");

        return (
          <a
            className="quick-contact__link"
            href={item.href}
            key={item.label}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            <Icon size={15} aria-hidden="true" />
            <span className="quick-contact__label">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
