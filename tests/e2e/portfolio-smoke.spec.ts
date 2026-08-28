import { expect, test } from "@playwright/test";

test("home renders, toggles settings, navigates UI, opens links, and loads images", async ({ page, isMobile }) => {
  await page.context().clearCookies();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Silvio Cardoso" })).toBeVisible();
  await expect(page.locator(".hero__role")).toContainText("Front-end Developer");

  const controls = isMobile ? page.locator(".mobile-menu__panel") : page.locator(".top-controls");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile portfolio navigation" })).toBeVisible();
  }

  await controls.getByRole("button", { name: "PT" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  await expect(page.getByRole("heading", { name: "Um pouco da minha história" })).toBeVisible();

  await controls.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "A little bit of my story" })).toBeVisible();

  await controls.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await controls.getByRole("button", { name: /switch to dark mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  async function navigateToSection(hash: string, label: string) {
    if (isMobile) {
      const menuButton = page.getByRole("button", { name: "Open menu" });

      if (await menuButton.isVisible()) {
        await menuButton.click();
        await expect(page.getByRole("navigation", { name: "Mobile portfolio navigation" })).toBeVisible();
      }

      await page.locator(".mobile-menu__panel").getByRole("link", { name: label }).click();
      return;
    }

    await page.locator(`.section-dots a[href="${hash}"]`).click();
  }

  await navigateToSection("#projects", "Projects");

  await expect(page).toHaveURL(/#projects$/u);
  await expect(page.getByRole("heading", { name: "Selected work shaped for clarity, speed, and visual impact." })).toBeVisible();

  const projectLink = page.getByRole("link", { name: "View project KitchenAid Brazil - Instagram Stories-like Component" });
  await expect(projectLink).toHaveAttribute("href", "https://www.kitchenaid.com.br/");
  await expect(projectLink).toHaveAttribute("target", "_blank");

  await navigateToSection("#design-work", "Design Work");
  await expect(page).toHaveURL(/#design-work$/u);
  await page.getByRole("button", { name: "Expand Canal do Rique - Barcelona" }).first().click();
  await expect(page.getByRole("dialog", { name: "Canal do Rique - Barcelona" })).toBeVisible();
  await page.getByRole("button", { name: "Close image preview" }).click();
  await expect(page.getByRole("dialog", { name: "Canal do Rique - Barcelona" })).toBeHidden();

  await navigateToSection("#links", "Links");
  await expect(page.getByRole("link", { name: "GitHub" }).last()).toHaveAttribute(
    "href",
    "https://github.com/silviocardosodev",
  );

  const brokenImages = await page.locator("img").evaluateAll((images: HTMLImageElement[]) =>
    images
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("alt") || image.getAttribute("src") || "unnamed image"),
  );

  expect(brokenImages).toEqual([]);
});
