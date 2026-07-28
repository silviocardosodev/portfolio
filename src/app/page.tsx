"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { BrandsSection } from "@/components/BrandsSection";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import { DesignWorkSection } from "@/components/DesignWorkSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LinksSection } from "@/components/LinksSection";
import { MobileMenu } from "@/components/MobileMenu";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuickContactLinks } from "@/components/QuickContactLinks";
import { Section } from "@/components/Section";
import { SkillsSection } from "@/components/SkillsSection";
import { ThemeToggle, type Theme } from "@/components/ThemeToggle";
import { TopNav } from "@/components/TopNav";
import { portfolioCopy, type Locale } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    return storedTheme ?? (prefersLight ? "light" : "dark");
  });
  const copy = useMemo(() => portfolioCopy[locale], [locale]);
  const activeHref = useActiveSection(copy.navigation);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <main className="portfolio" id="top">
      <LanguageToggle locale={locale} onChange={setLocale} labels={copy.language} />
      <ThemeToggle theme={theme} onChange={setTheme} />
      <QuickContactLinks />
      <MobileMenu
        items={copy.navigation}
        labels={copy.language}
        locale={locale}
        onLocaleChange={setLocale}
        theme={theme}
        onThemeChange={setTheme}
        activeHref={activeHref}
      />
      <Hero copy={copy.hero} />
      <Section id="summary" eyebrow={copy.summary.eyebrow} title={copy.summary.title}>
        <div className="summary">
          <p className="summary__text text-copy">{copy.summary.body}</p>
          <div className="summary__actions" aria-label={copy.summary.actionsLabel}>
            <a className="button button--primary" href="mailto:hello@silviocardoso.dev">
              <Mail size={18} aria-hidden="true" />
              <span>{copy.hero.contact}</span>
            </a>
            <CvDownloadButton className="button button--ghost" label={copy.hero.cv} />
            <a className="button button--quiet" href="https://wa.me/" target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              <span>{copy.summary.quickTalk}</span>
            </a>
          </div>
        </div>
      </Section>
      <ExperienceSection copy={copy.experience} />
      <EducationSection copy={copy.education} />
      <ProjectsSection copy={copy.projects} projects={copy.projectItems} />
      <BrandsSection copy={copy.brands} />
      <DesignWorkSection copy={copy.designWork} />
      <SkillsSection copy={copy.skills} />
      <LinksSection copy={copy.links} />
      <TopNav items={copy.navigation} activeHref={activeHref} />
    </main>
  );
}
