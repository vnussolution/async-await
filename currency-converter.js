
const axios = require('axios');

const getExchangeRate = async (from, to) => {
    // return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    //     return response.data.rates[to];
    // });

    try {
        console.log('111');
        var response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        var rate = response.data.rates[to];
        if (rate)
            return rate;
        else throw new Error();
    } catch (e) {
        throw new Error(`unable to get exchange rate for ${from} and ${to}`);
    }

}

const getCountries = async (currencyCode) => {
    // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    //     return response.data.map((country) => country.name);
    // });

    try {
        var response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get coutries that use ${currencyCode}`);
    }


}

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to).then((rate) => {
            var exchangeAmount = amount * rate;

            return `${amount} ${from} is worth ${exchangeAmount} ${to} can be used in the following countries: ${countries.join(', ')}`;
        });
    })
};

const convertCurrencyAlt = async (from, to, amount) => {
    var countries = await getCountries(to);
    var rate = await getExchangeRate(from, to);

    var exchangeAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangeAmount} ${to} can be used in the following countries: ${countries.join(', ')}`;
}

//getExchangeRate('USD', 'SGD').then((rate) => console.log('rate  = ', rate));

//getCountries('USD').then((countries) => console.log('countries:: ', countries.join(', ')));

convertCurrency('USD', 'SGD', 10).then((response) => console.log(response)).catch((e) => console.log(e.message));
//convertCurrency('USD', 'CAD', 10).then((response) => console.log(response)).catch((e) => console.log(e));