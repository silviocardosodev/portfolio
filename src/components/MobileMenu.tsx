import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/data/portfolio";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle, type Theme } from "@/components/ThemeToggle";
import { fallbackNavigationIcon, navigationIcons } from "@/components/navigationIcons";

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
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-mobile-menu-open", isOpen);

    if (!isOpen) {
      return () => {
        document.documentElement.removeAttribute("data-mobile-menu-open");
      };
    }

    const { body, documentElement } = document;
    const visualViewport = window.visualViewport;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyOverflow = body.style.overflow;

    function updateVisualViewportHeight() {
      documentElement.style.setProperty(
        "--mobile-menu-viewport-height",
        `${visualViewport?.height ?? window.innerHeight}px`,
      );
    }

    scrollPositionRef.current = window.scrollY;
    updateVisualViewportHeight();
    body.style.position = "fixed";
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    visualViewport?.addEventListener("resize", updateVisualViewportHeight);
    visualViewport?.addEventListener("scroll", updateVisualViewportHeight);
    window.addEventListener("orientationchange", updateVisualViewportHeight);

    return () => {
      document.documentElement.removeAttribute("data-mobile-menu-open");
      documentElement.style.removeProperty("--mobile-menu-viewport-height");
      visualViewport?.removeEventListener("resize", updateVisualViewportHeight);
      visualViewport?.removeEventListener("scroll", updateVisualViewportHeight);
      window.removeEventListener("orientationchange", updateVisualViewportHeight);
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen]);

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

      <button
        className="mobile-menu__backdrop"
        type="button"
        aria-label="Close menu"
        onClick={() => setIsOpen(false)}
      />

      <div className="mobile-menu__panel">
        <div className="mobile-menu__controls">
          <LanguageToggle locale={locale} onChange={onLocaleChange} labels={labels} />
          <ThemeToggle className="mobile-menu__theme" theme={theme} onChange={onThemeChange} />
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile portfolio navigation">
          <ul className="mobile-menu__list">
            {items.map((item, index) => {
              const Icon = navigationIcons[index] ?? fallbackNavigationIcon;
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
