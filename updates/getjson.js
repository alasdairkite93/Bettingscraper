var fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


var url = "https://apisds.paddypower.com/sdspp/content-managed-page/v7?_ak=vsd0Rm5ph2sS2uaK&betexRegion=GBR&capiJurisdiction=intl&cardsLimit=1&countryCode=GB&currencyCode=GBP&eventTypeId=1&exchangeLocale=en_GB&includeEuromillionsWithoutLogin=false&includeMarketBlurbs=true&includePrices=true&includeRaceCards=true&language=en&loggedIn=false&nextRacesMarketsLimit=3&page=SPORT&priceHistory=3&regionCode=UK&requestCountryCode=GB&staticCardsIncluded=SEO_CONTENT_SUMMARY&tab=accas&timezone=Europe%2FLondon"
var com = "https://apisds.paddypower.com/sdspp/content-managed-page/v7?_ak=vsd0Rm5ph2sS2uaK&betexRegion=GBR&capiJurisdiction=intl&cardsLimit=1&countryCode=GB&currencyCode=GBP&eventTypeId=7522&exchangeLocale=en_GB&includeEuromillionsWithoutLogin=false&includeMarketBlurbs=true&includePrices=true&includeRaceCards=true&language=en&loggedIn=false&nextRacesMarketsLimit=3&page=SPORT&priceHistory=3&regionCode=UK&requestCountryCode=GB&staticCardsIncluded=SEO_CONTENT_SUMMARY&tab=accas&timezone=Europe%2FLondon"

//var url = process.argv[2];
async function getJson(url) {

    let response = await fetch(url);

    let commits = await response.json();

    fs.writeFile('mainpage.json', JSON.stringify(commits), (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
}

getJson(url);