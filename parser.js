const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const getExchangeRate = async (currencyCode='USD') => {
    const dom = await JSDOM.fromURL(
        `https://freecurrencyrates.com/ru/convert-${currencyCode}-UAH/fcr`,
        {
            includeNodeLocations: true,
            storageQuota: 10000000,
            resources: "usable"
        }
    );
    const document = dom.window.document;
    const currencyFullInfo = document
        .querySelector('body > main > div > div:nth-child(3) > p:nth-child(3)')
        .textContent;


    // throw currencyFullInfo;
    return currencyFullInfo.match(/Это значит, что (.+)/)[1].trim()
};

module.exports = {
    getExchangeRate
};