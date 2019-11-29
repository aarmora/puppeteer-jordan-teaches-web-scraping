import puppeteer from 'puppeteer';


(async () => {

    await handleListOfJavascriptLinks();
})();


// This does not work.
// When you navigate, the context is gone and it can't navigate to any additional ones
async function clickLinkHandles() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const baseDomain = 'http://pizza.com';

    await page.goto(`${baseDomain}/pizza-news`);

    // Get all the link elements
    const linkHandles = await page.$$('.word-only a');

    for (let linkHandle of linkHandles) {
        await linkHandle.click();
    }

    await browser.close();

}


// This works great if it's a link
async function getLinksAndNavigate() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const baseDomain = 'http://pizza.com';

    await page.goto(`${baseDomain}/pizza-news`);

    const links = await page.evaluate(() => Array.from(document.querySelectorAll('.word-only a'), element => element.getAttribute('href')));
    for (let link of links) {
        console.log('link', link);
        await page.goto(`${baseDomain}${link}`);
    }

    await browser.close();

}

// This is for a list of javascript links...most of the time.
async function handleListOfJavascriptLinks() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`https://www.miamidade.realforeclose.com/index.cfm?zaction=USER&zmethod=CALENDAR`);
    const dayids = await page.$$eval('.CALSELF', elements => elements.map(element => element.getAttribute('dayid')));

    const baseDayPage = `https://www.miamidade.realforeclose.com/index.cfm?zaction=AUCTION&Zmethod=PREVIEW&AUCTIONDATE=`;

    for (let dayid of dayids) {
        await page.goto(`${baseDayPage}${dayid}`);
    }

    await browser.close();

}