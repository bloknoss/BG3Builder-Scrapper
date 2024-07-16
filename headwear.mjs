import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://bg3.wiki/wiki/Headwear");

    const products = await page.$$eval("table.wikitable  > tbody > tr", (results) =>
        results
            .map((el) => {
                const headwear = el.querySelector("td > p > a > span")?.innerText;

                const image = "https://bg3.wiki" + el.querySelector("td > p > span > a > img").getAttribute("src");

                const fullWeight = el.querySelector("td:nth-child(2) > p")?.innerText;

                var splittedWeight = fullWeight.split("\n");

                const kgWeight = splittedWeight[0];
                const lbWeight = splittedWeight[1];

                const price = el.querySelector("td:nth-child(3)")?.innerText;

                return { headwear, image, kgWeight, lbWeight, price };
            })
            .filter((item) => item !== null)
    );

    console.log(JSON.stringify(products, null, 2));
    // console.log(products);
    await browser.close();
})();
