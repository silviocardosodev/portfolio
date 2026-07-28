import { useState } from "react";
import { BriefcaseBusiness, FolderKanban, Languages, Link2, Menu, Sparkles, UserRound, X } from "lucide-react";
import type { Locale } from "@/data/portfolio";
import { ThemeToggle, type Theme } from "@/components/ThemeToggle";

const icons = [UserRound, BriefcaseBusiness, FolderKanban, Sparkles, Link2];

type MobileMenuProps = {
  items: readonly { href: string; label: string }[];
  labels: { en: string; pt: string; aria: string };
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  activeHref: string;
};

export function MobileMenu({ items, labels, locale, onLocaleChange, theme, onThemeChange, activeHref }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
      <button
        className="mobile-menu__trigger"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <div className="mobile-menu__panel">
        <div className="mobile-menu__controls">
          <div className="mobile-menu__languages" aria-label={labels.aria}>
            <Languages className="mobile-menu__language-icon" size={16} aria-hidden="true" />
            <button
              className={`mobile-menu__language-button ${locale === "en" ? "mobile-menu__language-button--active" : ""}`}
              type="button"
              onClick={() => onLocaleChange("en")}
            >
              {labels.en}
            </button>
            <button
              className={`mobile-menu__language-button ${locale === "pt" ? "mobile-menu__language-button--active" : ""}`}
              type="button"
              onClick={() => onLocaleChange("pt")}
            >
              {labels.pt}
            </button>
          </div>
          <ThemeToggle className="mobile-menu__theme" theme={theme} onChange={onThemeChange} />
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile portfolio navigation">
          <ul className="mobile-menu__list">
            {items.map((item, index) => {
              const Icon = icons[index] ?? Link2;
              return (
                <li className="mobile-menu__item" key={item.href}>
                  <a
                    className={`mobile-menu__link ${activeHref === item.href ? "mobile-menu__link--active" : ""}`}
                    href={item.href}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
