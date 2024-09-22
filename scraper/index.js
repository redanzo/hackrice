const puppeteer = require('puppeteer');

class Scraper {

    headless = false;
    baseURL = 'https://finviz.com/quote.ashx?t=';

    async get(query) {
        this.start = Date.now();
        this.query = query;
        const result = await this.init();
        result.runtime = Date.now() - this.start;
        return result;
    }

    async init() {
        const browser = await puppeteer.launch({
            headless: this.headless
        });
        const page = await browser.newPage();
        await page.goto(`${this.baseURL}${this.query}`);
        await page.waitForNetworkIdle();
        const result = await page.evaluate(() => {
            const data = {};
            data.code = document.querySelector('.quote-header_ticker-wrapper .js-recent-quote-ticker').innerText;
            data.title = document.querySelector('.quote-header_ticker-wrapper .tab-link').innerText;
            data.runtime = 0;
            data.news = [];

            let date = new Date();

            document.querySelectorAll('.news-table tr').forEach((item, index) => {
                const timestamp = item.querySelector('td').innerText;
                if (timestamp.match(/.{3}-\d{1,2}-\d{2}\s\d{2}:\d{2}(AM|PM)/g)?.[0]) date.setDate(date.getDate() - 1);
                const time = timestamp.match(/\d{2}:\d{2}/g)[0].split(':');
                if (timestamp.endsWith('PM') && time[0] !== 12) time[0] = parseInt(time[0]) + 12;

                data.news.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]).toString(),
                    title: item.querySelector('a').innerText,
                    url: item.querySelector('a').href
                })

            });

            return data;
        });
        await browser.close();
        return result;
    }
}

new Scraper().get('MSFT').then(d => require('fs').writeFileSync('./result.json', JSON.stringify(d, null, 4))).catch(console.error);