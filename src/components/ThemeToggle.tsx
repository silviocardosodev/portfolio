import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";

type ThemeToggleProps = {
  theme: Theme;
  onChange: (theme: Theme) => void;
  className?: string;
};

export function ThemeToggle({ theme, onChange, className = "" }: ThemeToggleProps) {
  const isLight = theme === "light";

  return (
    <button
      className={`theme-toggle ${isLight ? "theme-toggle--light" : "theme-toggle--dark"} ${className}`.trim()}
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={() => onChange(isLight ? "dark" : "light")}
    >
      <span className="theme-toggle__thumb" aria-hidden="true" />
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={16} aria-hidden="true" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={16} aria-hidden="true" />
    </button>
  );
}
