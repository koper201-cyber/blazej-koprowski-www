import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { readContent } from "../../src/lib/content";
import { siteSchema } from "../../src/lib/site-schema";

const siteData = siteSchema.parse(
  readContent(readFileSync(process.env.SITE_FILE ?? "site.md", "utf8")).data,
);

test("sekcje oferty i mobilny kontakt działają bez zasłaniania stopki", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const bar = page.getByRole("navigation", { name: "Szybki kontakt" });
  if (!siteData.sales) {
    await expect(page.locator("#wspolpraca, #doswiadczenie")).toHaveCount(0);
    await expect(bar).toHaveCount(0);
    return;
  }
  if (siteData.sales.process)
    await expect(page.locator("#wspolpraca ol > li")).toHaveCount(
      siteData.sales.process.steps.length,
    );
  if (siteData.sales.expertise)
    await expect(
      page.getByRole("heading", {
        name: siteData.sales.expertise.enterprise_heading,
      }),
    ).toBeVisible();
  if (!siteData.features.contact || !siteData.sales.mobile_contact) {
    await expect(bar).toHaveCount(0);
    return;
  }
  await expect(bar).toBeVisible();
  await expect(
    bar.getByRole("link", { name: "Napisz", exact: true }),
  ).toHaveAttribute("href", `mailto:${siteData.contact.email}`);
  if (siteData.contact.phone)
    await expect(
      bar.getByRole("link", { name: "Zadzwoń", exact: true }),
    ).toHaveAttribute(
      "href",
      `tel:${siteData.contact.phone.replace(/\s+/g, "")}`,
    );
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  const footer = await page.locator(".site-footer").boundingBox();
  const bounds = await bar.boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(bounds!.y + 1);
  await page.locator(".site-footer a").last().focus();
  const focused = await page.locator(".site-footer a").last().boundingBox();
  expect(focused!.y + focused!.height).toBeLessThanOrEqual(bounds!.y);
  await page.screenshot({ path: testInfo.outputPath("mobile-footer.png") });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(bar).toBeHidden();
});

test("semantyka, bezpieczeństwo i dostępność", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("main")).toBeVisible();
  const theme = await page
    .locator('meta[name="theme-color"]')
    .getAttribute("content");
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim()
        .toLowerCase(),
    ),
  ).toBe(theme?.toLowerCase());
  expect(
    await page.evaluate(() => Reflect.get(window, "__xss")),
  ).toBeUndefined();
  expect(
    await page.locator(".prose script,.prose img,.prose iframe").count(),
  ).toBe(0);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(errors).toEqual([]);
});
test("reflow 320px, fokus klawiatury i odnośniki", async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(
    page.getByRole("link", { name: "Przejdź do treści" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("tresc");
  for (const link of await page.locator('nav a[href*="#"]').all()) {
    const id = (await link.getAttribute("href"))?.split("#")[1];
    expect(await page.locator(`[id="${id}"]`).count()).toBe(1);
  }
});
test("podstawowa treść i kontakt bez JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  if (await page.locator("#kontakt").count())
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await context.close();
});
test("formularz ma walidację i obsługuje odpowiedź dostawcy bez prawdziwej wysyłki", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator(".contact-form");
  if (!(await form.count())) {
    if (await page.locator("#kontakt").count())
      await expect(
        page.getByRole("link", { name: "Napisz e-mail" }),
      ).toBeVisible();
    return;
  }
  await form.getByRole("button").click();
  expect(
    await page
      .locator('input[name="name"]')
      .evaluate((el: HTMLInputElement) => el.validity.valueMissing),
  ).toBe(true);
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: '<!doctype html><html><head><meta charset="utf-8"></head><body><h1>Odpowiedź testowa</h1></body></html>',
    }),
  );
  await page.getByLabel("Imię", { exact: true }).fill("Test");
  await page.getByLabel("E-mail", { exact: true }).fill("test@example.com");
  await page
    .getByLabel("Wiadomość", { exact: true })
    .fill("Fikcyjna wiadomość testowa");
  await form.getByRole("button").click();
  await expect(
    page.getByRole("heading", { name: "Odpowiedź testowa" }),
  ).toBeVisible();
});
test("indeksacja, sitemap i nagłówki wynikowego artefaktu", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  const html = await response.text();
  const preview = Boolean(
    process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main",
  );
  expect(html.includes('content="noindex, nofollow"')).toBe(preview);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots.includes("Disallow: /")).toBe(preview);
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).not.toMatch(/\/404|\/dziekuje/);
});

test("warsztaty ukrywają się po dacie także bez nowego buildu", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2030-01-01T12:00:00Z") });
  await page.goto("/");
  const items = page.locator("[data-events] [data-date]");
  for (const item of await items.all()) await expect(item).toBeHidden();
  if (await page.locator("[data-events-empty]").count())
    await expect(page.locator("[data-events-empty]")).toBeVisible();
});

test("powiększony tekst, ograniczenie ruchu i podgląd wizualny", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).not.toBe("smooth");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: testInfo.outputPath("desktop-viewport.png") });
  await page.screenshot({
    path: testInfo.outputPath("desktop.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.screenshot({ path: testInfo.outputPath("mobile-viewport.png") });
  await page.screenshot({
    path: testInfo.outputPath("mobile.png"),
    fullPage: true,
  });
});
