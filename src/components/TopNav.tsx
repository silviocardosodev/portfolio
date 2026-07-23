import { BriefcaseBusiness, FolderKanban, Link2, Sparkles, UserRound } from "lucide-react";

const icons = [UserRound, BriefcaseBusiness, FolderKanban, Sparkles, Link2];

export function TopNav({
  items,
  activeHref,
}: {
  items: readonly { href: string; label: string }[];
  activeHref: string;
}) {
  return (
    <nav className="top-nav" aria-label="Portfolio navigation">
      <ul className="top-nav__list">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Link2;
          return (
            <li className="top-nav__item" key={item.href}>
              <a
                className={`top-nav__link ${activeHref === item.href ? "top-nav__link--active" : ""}`}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
              >
                <Icon size={17} aria-hidden="true" />
                <span className="top-nav__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
