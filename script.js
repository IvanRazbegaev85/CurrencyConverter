const currencyValueInput = document.getElementById('value-input');
const currencyValueOutput = document.getElementById('value-output');
const convertBtn = document.getElementById('convert-btn');
let currencySelectTo = document.getElementById('currency-to-select');
let currencySelectFrom = document.getElementById('currency-from-select');
let amountToConvert = document.getElementById('amount-input');
let amountConverted = document.getElementById('amount-output');

const url = 'https://xecdapi.xe.com/v1/convert_from.json/?';
const currencies = {
    RUB: 'Рубли',
    USD: 'Доллары',
    EUR: 'Евро'
}

amountToConvert.addEventListener('input', (e) => {
    const pattern = /[^0-9]/g;
    e.target.value = e.target.value.replace(pattern, '');
})

const fillingOptions = (formToAppend) => {
    for (let currenciesKey in currencies) {
        const option = new Option(currenciesKey, `${currenciesKey}`);
        formToAppend.append(option);
    }
}

const getExchangeRates = async () => {
    currencySelectTo = document.getElementById('currency-to-select');
    currencySelectFrom = document.getElementById('currency-from-select');
    amountToConvert = document.getElementById('amount-input');
    if (!amountToConvert.value.trim()){
        alert('Введите количество валюты!')
    }
    const from = currencySelectFrom[currencySelectFrom.selectedIndex].value;
    const to = currencySelectTo[currencySelectTo.selectedIndex].value;
    const query = `${url}&from=${from}&to=${to}&amount=${amountToConvert.value}`;

    const getData = await fetch(query,{
        headers:{
            'Authorization' : 'Basic bXlzZWxmMTE2MTI5ODg1Ojc3bXRwNDNpYmZsMzlwYnNuaHM5M2MzdHM1'
        }
    });

    return (await getData).json()
}

fillingOptions(currencySelectTo);
fillingOptions(currencySelectFrom);

convertBtn.addEventListener('click', async () => {
    currencySelectTo = document.getElementById('currency-to-select');
    currencySelectFrom = document.getElementById('currency-from-select');

    if(currencySelectFrom.selectedIndex === 0 || currencySelectTo.selectedIndex === 0){
        alert ('Выберите валюту!');
        return false;
    }
    const rates = await getExchangeRates();

    amountConverted.value = (rates.to[0].mid).toFixed(3);

    for (const [key, value] of Object.entries(currencies)){
        if(rates.to[0].quotecurrency === key){
            currencyValueOutput.value = value;
        }
        if(rates.from === key){
            currencyValueInput.value = value;
        }
    }
})

