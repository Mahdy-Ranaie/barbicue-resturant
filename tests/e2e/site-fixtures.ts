import { expect, test as base } from "@playwright/test";
import { media } from "../../src/config/media";

export const thumbnailFixture = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="#10110f"/></svg>';
export const standardFixture = '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#10110f"/></svg>';

const photos = new Set([
  media.hero, media.about, ...Object.values(media.menu), ...media.gallery.map((item) => item.thumbnail.src),
]);
const standardPhotos = new Set(media.gallery.map((item) => item.standard.src));

export const test = base.extend<{ siteFixtures: void }>({
  siteFixtures: [async ({ page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(
      (url) => url.pathname === media.logo
        || url.pathname === media.video.poster
        || (url.pathname === "/_next/image" && photos.has(url.searchParams.get("url") ?? "")),
      (route) => route.fulfill({ contentType: "image/svg+xml", body: thumbnailFixture }),
    );
    await page.route(
      (url) => standardPhotos.has(url.pathname),
      (route) => route.fulfill({ contentType: "image/svg+xml", body: standardFixture }),
    );
    await page.route((url) => url.pathname === media.video.src, (route) => route.fulfill({ status: 204 }));
    await use();
    expect(errors, "uncaught browser errors").toEqual([]);
  }, { auto: true }],
});

export { expect };
