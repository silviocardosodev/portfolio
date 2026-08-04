import { fallbackNavigationIcon, navigationIcons } from "@/components/navigationIcons";

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
          const Icon = navigationIcons[index] ?? fallbackNavigationIcon;
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
