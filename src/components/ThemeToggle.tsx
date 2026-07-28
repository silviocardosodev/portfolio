import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";

type ThemeToggleProps = {
  theme: Theme;
  onChange: (theme: Theme) => void;
  className?: string;
};

export function ThemeToggle({ theme, onChange, className = "" }: ThemeToggleProps) {
  const isLight = theme === "light";
  const Icon = isLight ? Sun : Moon;

  return (
    <button
      className={`theme-toggle ${className}`.trim()}
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={() => onChange(isLight ? "dark" : "light")}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
