import { test, expect } from "./site-fixtures";
import type { Locator } from "@playwright/test";
import { galleryItems, media } from "../../src/config/media";
import { content, galleryCopy } from "../../src/content/site";

const first = galleryItems[0];
const second = galleryItems[1];

function imagePath(image: Locator) {
  return image.evaluate((element: HTMLImageElement) => new URL(element.src).pathname);
}

test("loads Persian Gallery with thumbnails and shared navigation", async ({ page }) => {
  expect((await page.goto("/gallery"))?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(galleryCopy.fa.title);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("contentinfo")).toBeVisible();
  const firstThumbnail = page.getByRole("button", { name: first.title.fa }).locator("img");
  await expect.poll(() => firstThumbnail.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  expect(new URL(await firstThumbnail.evaluate((img: HTMLImageElement) => img.currentSrc))
    .searchParams.get("url")).toBe(first.thumbnail.src);

  await page.getByRole("navigation").getByRole("link", { name: content.fa.nav.menu }).click();
  await expect(page).toHaveURL(/\/#menu$/);
  await expect(page.locator("#menu")).toBeInViewport();
});

test("links the header to the homepage preview and opens Gallery through both preview links", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("link", { name: content.fa.nav.gallery }).click();
  await expect(page).toHaveURL(/\/#gallery$/);
  await page.locator("#gallery").getByRole("heading", { level: 2 }).getByRole("link").click();
  await expect(page).toHaveURL(/\/gallery$/);
  await page.getByRole("link", { name: galleryCopy.fa.backHome }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.getByRole("link", { name: galleryCopy.fa.viewAll }).click();
  await expect(page).toHaveURL(/\/gallery$/);
  await page.getByRole("navigation").getByRole("link", { name: content.fa.nav.gallery }).click();
  await expect(page).toHaveURL(/\/#gallery$/);
});

test("uses one through four columns at responsive widths", async ({ page }) => {
  await page.goto("/gallery");
  const grid = page.getByRole("main").getByRole("list");
  for (const [width, expected] of [[320, 1], [768, 2], [1024, 3], [1440, 4]]) {
    await page.setViewportSize({ width, height: 800 });
    await expect.poll(() => grid.evaluate((element) => (
      getComputedStyle(element).gridTemplateColumns.split(" ").length
    ))).toBe(expected);
  }
});

test("only requests standard images on demand and supports viewer controls", async ({ page }) => {
  const standards: string[] = [];
  page.on("request", (request) => {
    const { pathname } = new URL(request.url());
    if (pathname.startsWith("/images/gallery/standard/")) standards.push(pathname);
  });
  await page.goto("/");
  const thumbnails = page.locator("#gallery img");
  await thumbnails.first().scrollIntoViewIfNeeded();
  await expect(thumbnails).toHaveCount(galleryItems.filter((item) => item.featured).length);
  await expect.poll(() => thumbnails.first().evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.getByRole("link", { name: galleryCopy.fa.viewAll }).click();
  const trigger = page.getByRole("button", { name: first.title.fa });
  await expect.poll(() => trigger.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  expect(standards).toEqual([]);

  await trigger.click();
  const viewer = page.getByRole("dialog");
  const photo = viewer.locator("img");
  await expect(viewer).toHaveAccessibleName(first.title.fa);
  await expect(viewer.getByRole("button", { name: galleryCopy.fa.close })).toBeFocused();
  await expect(photo).toBeVisible();
  await expect.poll(() => imagePath(photo)).toBe(first.standard.src);
  await expect(viewer.getByRole("status")).toHaveText(`۱ از ${new Intl.NumberFormat("fa").format(galleryItems.length)}`);
  expect(standards).toEqual([first.standard.src]);
  expect(await photo.evaluate((img: HTMLImageElement) => (
    Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight)
  ))).toBeLessThan(0.02);

  await viewer.getByRole("button", { name: galleryCopy.fa.actualSize }).click();
  await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.clientWidth)).toBe(1600);
  await viewer.getByRole("button", { name: galleryCopy.fa.fit }).click();
  await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.clientWidth)).toBeLessThan(1600);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await viewer.getByRole("button", { name: galleryCopy.fa.next }).click();
  await expect.poll(() => imagePath(photo)).toBe(second.standard.src);
  await viewer.getByRole("button", { name: galleryCopy.fa.previous }).click();
  await expect.poll(() => imagePath(photo)).toBe(first.standard.src);
  await page.keyboard.press("ArrowLeft");
  await expect(viewer).toHaveAccessibleName(second.title.fa);
  await page.keyboard.press("ArrowRight");
  await expect(viewer).toHaveAccessibleName(first.title.fa);
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("keeps English across routes and supports LTR arrow direction without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("button", { name: content.fa.switchLanguage }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("navigation").getByRole("link", { name: content.en.nav.gallery }).click();
  await page.getByRole("link", { name: galleryCopy.en.viewAll }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(galleryCopy.en.title);
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await page.getByRole("button", { name: first.title.en }).click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toHaveAccessibleName(second.title.en);
  await page.getByRole("button", { name: galleryCopy.en.close }).click();
  await page.getByRole("link", { name: galleryCopy.en.backHome }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.en.headline);
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(galleryCopy.en.title);
  expect(errors).toEqual([]);
});

test("shows thumbnail and standard fallbacks without broken images", async ({ page }) => {
  const failedThumbnail = (src: string) => (url: URL) => (
    url.pathname === "/_next/image" && url.searchParams.get("url") === src
  );
  await page.route(failedThumbnail(first.thumbnail.src), (route) => route.fulfill({ status: 404 }));
  await page.route((url) => url.pathname === first.standard.src, (route) => route.fulfill({ status: 404 }));
  await page.goto("/gallery");
  const trigger = page.getByRole("button", { name: first.title.fa });
  await expect.poll(() => trigger.locator("img").evaluate((img: HTMLImageElement) => (
    img.naturalWidth ? new URL(img.currentSrc).pathname : null
  ))).toBe(media.placeholder);
  await expect(trigger.locator("img")).toHaveAttribute("alt", galleryCopy.fa.imageUnavailable);

  await trigger.click();
  const viewer = page.getByRole("dialog");
  await expect(viewer.getByText(galleryCopy.fa.imageUnavailable, { exact: true })).toBeVisible();
  await expect(viewer.locator("img")).toHaveCount(0);
  await expect(viewer.getByRole("button", { name: galleryCopy.fa.actualSize })).toBeDisabled();
  await viewer.getByRole("button", { name: galleryCopy.fa.next }).click();
  await expect(viewer.locator("img")).toBeVisible();
  await expect.poll(() => imagePath(viewer.locator("img"))).toBe(second.standard.src);
});

test("stops retrying when the thumbnail and its placeholder fail", async ({ page }) => {
  let placeholderRequests = 0;
  await page.route((url) => url.pathname === "/_next/image" && url.searchParams.get("url") === first.thumbnail.src,
    (route) => route.fulfill({ status: 404 }));
  await page.route((url) => url.pathname === media.placeholder, (route) => {
    placeholderRequests += 1;
    return route.fulfill({ status: 404 });
  });
  await page.goto("/gallery");
  const button = page.getByRole("button", { name: first.title.fa });
  await expect(button.locator('[role="img"]')).toHaveAttribute("aria-label", galleryCopy.fa.imageUnavailable);
  await expect(button.locator("img")).toHaveCount(0);
  expect(placeholderRequests).toBe(1);
});

test.describe("mobile Gallery", () => {
  test.use({ viewport: { width: 320, height: 720 }, isMobile: true, hasTouch: true });

  test("supports the mobile menu and fits both locales in portrait and landscape", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("button", { name: content.fa.mobileNavigation });
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation").getByRole("link", { name: content.fa.nav.about })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.getByRole("navigation").getByRole("link", { name: content.fa.nav.gallery }).click();
    await expect(page).toHaveURL(/\/#gallery$/);
    await page.getByRole("link", { name: galleryCopy.fa.viewAll }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(galleryCopy.fa.title);
    const noOverflow = () => page.evaluate(() => (
      document.documentElement.scrollWidth <= document.documentElement.clientWidth
    ));
    expect(await noOverflow()).toBe(true);
    await page.getByRole("button", { name: content.fa.switchLanguage }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(galleryCopy.en.title);
    expect(await noOverflow()).toBe(true);

    await page.getByRole("button", { name: first.title.en }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeInViewport();
    await page.setViewportSize({ width: 720, height: 320 });
    await expect(dialog.getByRole("button", { name: galleryCopy.en.close })).toBeInViewport();
    await dialog.getByRole("button", { name: galleryCopy.en.close }).click();
    expect(await noOverflow()).toBe(true);
  });
});
