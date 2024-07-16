import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://bg3.wiki/wiki/Shields");

    const products = await page.$$eval("table.wikitable  > tbody > tr", (results) =>
        results
            .map((el) => {
                const shields = el.querySelector("td > p > a > span")?.innerText;

                const image =
                    "https://bg3.wiki" + el.querySelector("td > p > span > span > a > img").getAttribute("src");

                const armourClass = el.querySelector("td:nth-child(2)")?.innerText;

                const fullWeight = el.querySelector("td:nth-child(3) > p")?.innerText;

                var splittedWeight = fullWeight.split("\n");

                const kgWeight = splittedWeight[0];
                const lbWeight = splittedWeight[1];

                const price = el.querySelector("td:nth-child(4)")?.innerText;

                return { shields, image, armourClass, kgWeight, lbWeight, price };
            })
            .filter((item) => item !== null)
    );

    console.log(JSON.stringify(products, null, 2));
    // console.log(products);
    await browser.close();
})();
