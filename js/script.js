// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI("AIzaSyDR2WDnon59BCwqOxF2Q6fvQCMuJL20BL8");

const PEXELS_API_KEY = 'biVzGfa9rbzQFcQ22s9Tcptpw9qK7AJb8Wa8wwmMpG8gMZuTYAO9KFzG'; // Replace with your actual API key

// const Scraper = require('../scraper/index');

// import Scraper from "../scraper/index.js";

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
let question = '';
let cT1 = '';
let cT2 = '';
let cT3 = '';
let cT4 = '';
let date = '';

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
            let count = 0
            document.getElementById('related-articles-header').style.display = 'block'
            updatedData.forEach(company_stock_news_list => {
                if (company_stock_news_list.code === code) {
                    // company_stock_news_list.news.forEach(nws => {
                    fetchArticles(company_stock_news_list.news.slice(0, 50), count++);
                    // break
                    // console.log('yessir')
                    // });
                    return;
                }
                // console.log('uiop');
                // return;
            });

            document.querySelector('iframe').src = `https://api.stockdio.com/visualization/financial/charts/v1/PricesChange?app-key=B0C6A025780B48E1B1800F375F2F3610&symbol=${selectedValues[index]}&days=3&palette=Excite-Bike&allowPeriodChange=false&backgroundColor=f0f0f0&negativeColor=f04747&positiveColor=43b581&axesLinesColor=f0f0f0&showLogo=Title&animate=true`;
            !document.querySelector('#overlay').classList.contains('hide') && document.querySelector('#overlay').classList.add('hide');

            defaultPrompt = `Give me a short 3-4 education description sentences on why ${code} stock has gone down based on these news articles: ${combinedTitles}`;
            let generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ defaultPrompt }),
            }).then((response) => response.json())
                .then((data) => {
                    paragraph.innerHTML = data.answer;
                    cT4 = data.answer;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            
            date = "Sep 19 2024";
            const combinedTitles1 = MSFT.news
            .filter(newsItem => newsItem.timestamp.includes(date))
            .slice(0, 5)
            .map(newsItem => newsItem.title)
            .join(', ');
            defaultPrompt = `Give me a short 3-4 education description sentences on why ${code} stock has gone down based on these news articles: ${combinedTitles1}`;
            generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ defaultPrompt }),
            }).then((response) => response.json())
                .then((data) => {
                    cT1 = data.answer;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

                date = "Sep 20 2024";
                const combinedTitles2 = MSFT.news
                .filter(newsItem => newsItem.timestamp.includes(date))
                .slice(0, 5)
                .map(newsItem => newsItem.title)
                .join(', ');
                defaultPrompt = `Give me a short 3-4 education description sentences on why ${code} stock has gone down based on these news articles: ${combinedTitles2}`;
                generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ defaultPrompt }),
                }).then((response) => response.json())
                    .then((data) => {
                        cT2 = data.answer;
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });

                    date = "Sep 21 2024";
                    const combinedTitles3 = MSFT.news
                    .filter(newsItem => newsItem.timestamp.includes(date))
                    .slice(0, 5)
                    .map(newsItem => newsItem.title)
                    .join(', ');
                    defaultPrompt = `Give me a short 3-4 education description sentences on why ${code} stock has gone down based on these news articles: ${combinedTitles3}`;
                    generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ defaultPrompt }),
                    }).then((response) => response.json())
                        .then((data) => {
                            cT3 = data.answer;
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });


        }
    });

    document.getElementById("playButton").addEventListener("click", () => {
        defaultPrompt = `Write 1-2 sentences about a fake new article scenario regarding about ${code}!`;
        const qBox = document.querySelector(".question-box .question p");

        generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ defaultPrompt }),
        }).then((response) => response.json())
            .then((data) => {
                qBox.innerHTML = `${data.answer} Would you think there will be a positive or negative trend on this?`;
                question = data.answer;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    })

    const sendButton = document.getElementById('send-btn');
    const messageInput = document.getElementById('messageInput');
    const responseParagraph = document.querySelector('.response p');

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            responseParagraph.textContent = message;
            messageInput.value = '';

            defaultPrompt = `In 1 sentence is this "Correct/Incorrect" response to the given news in the question? Give 2-3 sentence feedback to user who answered the question ${question} as: ${message}`;
            // console.log(defaultPrompt);
            const qBox = document.querySelector(".question-box .botResponse p");

            generateResponse = fetch("http://168.5.168.190:50000/generateResponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ defaultPrompt }),
            }).then((response) => response.json())
                .then((data) => {
                    qBox.innerHTML = `${data.answer}`;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });



    document.getElementById("playButton").addEventListener("click", () => {
        const additionalBox = document.querySelector(".additional-box");
        const questionBox = document.querySelector(".question-box");
        const playIcon = document.querySelector("#playButton .play-icon");
        const xIcon = document.querySelector("#playButton .x-icon");

        additionalBox.classList.toggle("hidden");
        questionBox.classList.toggle("hidden");
        playIcon.classList.toggle("hidden");
        xIcon.classList.toggle("hidden");

        if (additionalBox.classList.contains("hidden")) {
            questionBox.classList.remove("hidden");
        } else {
            questionBox.classList.add("hidden");
        }
    });


    document.querySelector('#back').onclick = () => {
        window.location.href = "index.html"
    }

    const box = document.querySelector("#overlay");

    let s1 = [0, 1100 / 3];
    let s2 = [s1[1], s1[1] * 2];
    let s3 = [s2[1], 1100];
    let current= 0

    function updateDisplay(event) {
        
        if (event.pageX > s1[0] && event.pageX < s1[1]) {
            paragraph.innerHTML = cT1;
            
        } else if (event.pageX > s2[0] && event.pageX < s2[1]) {
            paragraph.innerHTML = cT2;

        } else if (event.pageX > s3[0] && event.pageX < s3[1]) {
            paragraph.innerHTML = cT3;

        } else {
            paragraph.innerHTML = cT4;
        }
        console.log("here")
        // console.log(event.pageX)
    }

    box.addEventListener("mousemove", updateDisplay, false);
    box.addEventListener("mouseenter", updateDisplay, false);
    box.addEventListener("mouseleave", updateDisplay, false);


    const article_gallery = document.getElementById('article-gallery');

    async function fetchArticles(postedData, count) {
        const url = 'https://api.pexels.com/v1/search?query=stock&per_page=50'; // Adjust query as needed

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            });

            const data = await response.json();
            displayArticles(data.photos, postedData, count); // Assuming you're fetching photos
        } catch (error) {
            console.error('Error fetching articles:', error);
        }


    }
    // console.log('articles ', MSFT.news);
    async function displayArticles(photos_data, postedData, count) {
        const article_gallery = document.getElementById('article-gallery');
        article_gallery.innerHTML = ''; // Clear existing articles

        postedData.forEach(pd => {
            // let count = 0;
            let x = Math.floor(Math.random() * 50);
            // console.log(x)
            let photo = photos_data[x];
            // console.log(photo);
            const anchor = document.createElement('a');
            anchor.href = pd.url; // Adjust as needed
            anchor.classList.add('article-item');
            anchor.target = '_blank';

            const img = document.createElement('img');
            img.src = photo.src.medium; // Use the medium size image
            img.alt = photo.alt; // Set alt text

            const p = document.createElement('p');
            p.textContent = pd.title; // Or any other relevant text

            anchor.appendChild(img);
            anchor.appendChild(p);
            article_gallery.appendChild(anchor);
        });
    }

    // console.log(updatedData[0].news[0].title);

    // updatedData.forEach(company_stock_news_list => {
    //     if (company_stock_news_list.code === code) {
    //         //         //             company_stock_news_list.news.forEach(nws => {
    //         //         //             fetchArticles(nws);
    //         //         //             // break
    //         console.log('yessir')
    //         // });
    //         //         // return
    //         return;
    //     }
    //     console.log('uiop');
    //     return;
    // });


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

    // fetchArticles();

    // document.querySelector

};
