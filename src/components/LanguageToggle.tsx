import type { Locale } from "@/data/portfolio";

type LanguageLabels = {
  en: string;
  pt: string;
  aria: string;
};

export function LanguageToggle({
  locale,
  onChange,
  labels,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  labels: LanguageLabels;
}) {
  return (
    <div className="language-toggle" aria-label={labels.aria}>
      <button
        className={`language-toggle__button ${locale === "en" ? "language-toggle__button--active" : ""}`}
        type="button"
        onClick={() => onChange("en")}
      >
        {labels.en}
      </button>
      <button
        className={`language-toggle__button ${locale === "pt" ? "language-toggle__button--active" : ""}`}
        type="button"
        onClick={() => onChange("pt")}
      >
        {labels.pt}
      </button>
    </div>
  );
}
