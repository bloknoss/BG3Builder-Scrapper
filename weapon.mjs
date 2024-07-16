import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://bg3.wiki/wiki/List_of_weapons");

    const products = await page.$$eval("table.wikitable  > tbody > tr", (results) =>
        results
            .map((el) => {
                const weapon = el.querySelector("td > p > a > span")?.innerText;

                const unformatedRarity = el.querySelector("td > p > a > span")?.getAttribute("style");

                var rarity = unformatedRarity.split("#")[1];

                switch (rarity) {
                    case "FFFFFF;":
                        rarity = "Common";
                        break;
                    case "01BD39;":
                        rarity = "Uncommon";
                        break;
                    case "01BFFF;":
                        rarity = "Rare";
                        break;
                    case "D1017B;":
                        rarity = "Very rare";
                        break;
                    case "B7861D;":
                        rarity = "Legendary";
                        break;
                    case "FF5901;":
                        rarity = "Story item";
                        break;
                    default:
                        rarity = null;
                        break;
                }

                if (!weapon) return null;

                const image = "https://bg3.wiki" + el.querySelector("td > p > span > a > img").getAttribute("src");

                const allDamage = el.querySelector("td:nth-child(3) > p")?.innerText;

                var splitedDamage = allDamage.split("\n");

                var damage = splitedDamage.join(", ");

                const allDamageType = el.querySelector("td:nth-child(4) > p")?.innerText;

                var splitedDamageType = allDamageType.split("\n");

                var damageType = splitedDamageType.join(", ");

                const fullWeight = el.querySelector("td:nth-child(5) > p")?.innerText;

                var splittedWeight = fullWeight.split("\n");

                const kgWeight = splittedWeight[0];
                const lbWeight = splittedWeight[1];

                const price = el.querySelector("td:nth-child(6)")?.innerText;

                return { weapon, rarity, image, damage, damageType, kgWeight, lbWeight, price };
            })
            .filter((item) => item !== null)
    );

    console.log(JSON.stringify(products, null, 2));
    // console.log(products);
    await browser.close();
})();
