import puppeteer from 'puppeteer';


(async () => {
    await typeIntoContainsAndSearch();
})();

async function typeIntoContainsAndSearch() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://rcdb.com/os.htm?ot=2');

    await page.type('#nc', 'dragon');

    await page.click('#sub input');

    // Pause to see the interaction
    await page.waitFor(1500);

    await browser.close();
}

async function selectOperatingStatusAndSearch() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://rcdb.com/os.htm?ot=2');

    await page.select('#st', '93');

    // Pause to see the interaction
    await page.waitFor(1750);

    await page.click('#sub input');

    // Pause to see the interaction
    await page.waitFor(1500);

    await browser.close();
}


async function selectLocationAndSearch() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://rcdb.com/os.htm?ot=2');

    await page.$eval('#targetol', (element: any) => element.value = '19');

    await page.click('#sub input');

    // Pause to see the interaction
    await page.waitFor(1500);

    await browser.close();
}
