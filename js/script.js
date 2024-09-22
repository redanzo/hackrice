// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI("AIzaSyDR2WDnon59BCwqOxF2Q6fvQCMuJL20BL8");

const PEXELS_API_KEY = 'biVzGfa9rbzQFcQ22s9Tcptpw9qK7AJb8Wa8wwmMpG8gMZuTYAO9KFzG'; // Replace with your actual API key

const param = new URLSearchParams(window.location.search)
let query = (param.has('q')) ? param.get('q') : "" // query holds the value of 'q' param sent through the url
const values = {
    1: ["MSFT", "ORCL", "ADBE", "PANW"],
    2: ["AAPL", "WMT", "WMT", "WMT"],
    3: ["NVDA", "AVGO", "AMD", "QCOM"],
    4: ["CRM", "INTU", "NOW", "UBER"],
    5: ["V", "MA", "AXP", "JPM"],
    6: ["JPM", "BAC", "WFC", "C"],
    7: ["BRK-B", "AIG", "ACGL"],
    8: ["BX", "BLK", "KKR", "AMP"],
    9: ["GE", "RTX", "LMT", "BA"],
    10: ["ETN", "ITW", "PH", "EMR"],
    11: ["CAT", "DE", "PCAR", "WMT"],
    12: ["PWR", "J", "WMT", "WMT"],
    13: ["XOM", "CVX", "WMT", "WMT"],
    14: ["COP", "FANG", "OXY", "EOG"],
    15: ["SLB", "BKR", "HAL", "WMT"],
    16: ["XOM", "CVX", "WMT", "WMT"],
    17: ["JNJ", "LLY", "ABBV", "MRK"],
    18: ["CI", "UNH", "CVS", "CI"],
    19: ["JNJ", "LLY", "ABBV", "MRK"],
    20: ["REGN", "VRTX", "MRNA", "INCY"],
    21: ["GOOG", "META", "MTCH"],
    22: ["TMUS", "VZ", "T", "WMT"],
    23: ["NFLX", "DIS", "LYV", "WBD"],
    24: ["NFLX", "DIS", "LYV", "WBD"],
    25: ["AMZN", "EBAY", "ETSY", "WMT"],
    26: ["TSLA", "GM", "F", "WMT"],
    27: ["MCD", "SBUX", "CMG", "YUM"],
    28: ["BKNG", "ABNB", "RCL", "CCL"],
    29: ["NEE", "SO", "DUK", "AEP"],
    30: ["NEE", "SO", "DUK", "AEP"],
    31: ["NEE", "SO", "DUK", "AEP"],
    32: ["NEE", "SO", "DUK", "AEP"],
    33: ["WMT", "COST", "TGT", "DG"],
    34: ["PG", "CL", "KMB", "KVUE"],
    35: ["KO", "PEP", "KDP", "MNST"],
    36: ["AMT", "EQIX", "CCI", "DLR"],
    37: ["AMT", "EQIX", "CCI", "DLR"],
    38: ["AMT", "EQIX", "CCI", "DLR"],
    39: ["AMT", "EQIX", "CCI", "DLR"],
    40: ["AMT", "EQIX", "CCI", "DLR"]
}

let code = '';
let defaultPrompt = '';

window.onload = () => {

    const targetDate = "Sep 21 2024";
    const combinedTitles = MSFT.news
        .filter(newsItem => newsItem.timestamp.includes(targetDate))
        .slice(0, 10)
        .map(newsItem => newsItem.title)
        .join(', ');

    const paragraph = document.querySelector(".additional-box p");

    let userMessage = null;



    // console.log(generateResponse)


    let selectedValues = values[+query] || [];
    document.querySelectorAll('.w-layout-grid.grid-7 .text-block-12').forEach((element, index) => {
        element.innerHTML = selectedValues[index];
        element.onclick = () => {
            document.querySelectorAll('.w-layout-grid.grid-7 .text-block-12').forEach((element) => element.classList.remove('highlight'))
            element.classList.add('highlight');
            code = selectedValues[index];
            document.querySelector('iframe').src = `https://api.stockdio.com/visualization/financial/charts/v1/PricesChange?app-key=B0C6A025780B48E1B1800F375F2F3610&symbol=${selectedValues[index]}&days=3&palette=Excite-Bike&allowPeriodChange=false&backgroundColor=f0f0f0&negativeColor=f04747&positiveColor=43b581&axesLinesColor=f0f0f0&showLogo=Title&animate=true`;
            !document.querySelector('#overlay').classList.contains('hide') && document.querySelector('#overlay').classList.add('hide');

            defaultPrompt = `Give me a short 3-4 education description sentences on why ${code} stock has gone down based on these news articles: ${combinedTitles}`;
            const generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ defaultPrompt }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data); // Handle the response here
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });


    document.querySelector('#back').onclick = () => {
        window.location.href = "index.html"
    }

    const box = document.querySelector("#overlay");

    let s1 = [0, 1100 / 3];
    let s2 = [s1[1], s1[1] * 2];
    let s3 = [s2[1], 1100];

    function updateDisplay(event) {
        if (event.pageX > s1[0] && event.pageX < s1[1]) {
            console.log('s1')
        } else if (event.pageX > s2[0] && event.pageX < s2[1]) {
            console.log('s2')
        } else if (event.pageX > s3[0] && event.pageX < s3[1]) {
            console.log('s3')
        }
        // console.log(event.pageX)
    }

    box.addEventListener("mousemove", updateDisplay, false);
    box.addEventListener("mouseenter", updateDisplay, false);
    box.addEventListener("mouseleave", updateDisplay, false);


    const article_gallery = document.getElementById('article-gallery');

    async function fetchArticles() {
        const url = 'https://api.pexels.com/v1/search?query=stock&per_page=5'; // Adjust query as needed

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            });

            const data = await response.json();
            displayArticles(data.photos); // Assuming you're fetching photos
        } catch (error) {
            console.error('Error fetching articles:', error);
        }


    }
    console.log('articles ', MSFT.news);
    async function displayArticles(photos_data) {
        const article_gallery = document.getElementById('article-gallery');
        article_gallery.innerHTML = ''; // Clear existing articles

        photos_data.forEach(photo => {
            const anchor = document.createElement('a');
            anchor.href = photo.url; // Adjust as needed
            anchor.classList.add('article-item');

            const img = document.createElement('img');
            img.src = photo.src.medium; // Use the medium size image
            img.alt = photo.alt; // Set alt text

            const p = document.createElement('p');
            // p.textContent = MSFT; // Or any other relevant text

            anchor.appendChild(img);
            anchor.appendChild(p);
            article_gallery.appendChild(anchor);
        });
    }

    // MSFT.news.forEach(article => {

    //     const anchor = document.createElement('a');
    //     anchor.href = article.href;
    //     anchor.classList.add('article-item');

    //     const img = document.createElement('img');
    //     img.src = "./img/article1-thumbnail.png";

    //     const p = document.createElement('p');
    //     p.textContent = article.text;

    //     anchor.appendChild(img);
    //     anchor.appendChild(p);

    //     article_gallery.appendChild(anchor);
    // });

    fetchArticles();
};
