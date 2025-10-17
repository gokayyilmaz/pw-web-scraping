const { chromium } = require("playwright");
const db = require("./db.json");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (film of db.films) {
    await page.goto(`https://en.wikipedia.org/wiki/${film}`);

    const stars = await page.locator(
      "//td[preceding-sibling::th[text()='Starring']]/div/ul/li"
    );

    console.log('-'.repeat(30));
    console.log(`${film} Starring:`);
    console.log('-'.repeat(30));
    
    for (let i = 0; i < (await stars.count()); i++) {
      const text = await stars.nth(i).textContent();
      console.log(text);
    }
    console.log();
    
  }

  await browser.close();
})();
