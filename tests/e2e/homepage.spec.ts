import { test, expect } from "./site-fixtures";
import { media } from "../../src/config/media";
import { content } from "../../src/content/site";

test("loads the homepage with Persian RTL as the default", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.fa.headline);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("main")).toHaveCSS("direction", "rtl");
});

test("switches to English LTR and back to Persian RTL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.en.headline);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("main")).toHaveCSS("direction", "ltr");

  await page.getByRole("button", { name: "تغییر زبان به فارسی" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.fa.headline);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("navigates to each section linked from the header", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation");
  const destinations = ["about", "menu", "services", "contact"] as const;
  for (const section of destinations) {
    const link = navigation.getByRole("link", { name: content.fa.nav[section], exact: true });
    await expect(link).toHaveAttribute("href", `/#${section}`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${section}$`));
    await expect(page.locator(`#${section}`)).toBeInViewport();
  }
});

test.describe("narrow mobile viewport", () => {
  test.use({ viewport: { width: 320, height: 720 }, isMobile: true, hasTouch: true });

  test("fits the viewport in both languages", async ({ page }) => {
    await page.goto("/");
    const overflow = () => page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.fa.headline);
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.en.headline);
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
});

test("shows the local image fallback when the hero photo is missing", async ({ page }) => {
  await page.route(
    (url) => url.pathname === "/_next/image" && url.searchParams.get("url") === media.hero,
    (route) => route.fulfill({ status: 404 }),
  );
  await page.goto("/");
  const hero = page.locator("#top").getByRole("img");
  await expect.poll(() => hero.evaluate((element: HTMLImageElement) => (
    element.naturalWidth > 0 ? new URL(element.currentSrc).pathname : null
  ))).toBe(media.placeholder);
});

test("shows the localized fallback when the MP4 is missing", async ({ page }) => {
  await page.route((url) => url.pathname === media.video.src, (route) => route.fulfill({ status: 404 }));
  await page.goto("/");
  const section = page.locator("#video");
  const fallbackText = section.getByRole("status").locator("p");
  await expect(fallbackText).toHaveText(content.fa.playFallback);
  await expect(section.locator("video")).toHaveCount(0);

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(fallbackText).toHaveText(content.en.playFallback);
});

test("loads and switches language without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.en.headline);
  expect(errors, "browser console errors").toEqual([]);
});
