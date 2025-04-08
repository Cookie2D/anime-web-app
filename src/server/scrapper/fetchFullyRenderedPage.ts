import puppeteer from "puppeteer";

export async function fetchFullyRenderedPage(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector(".playlists-items");

  const content = await page.content();
  await browser.close();
  return content;
}
