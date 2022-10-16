import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment';

const GOOGLE_SHEET_URI = 'https://script.google.com/macros/s/AKfycbym1LU2vJSHMDu4DKRnDjpyQYTUcC9hxNO1ST986ZHjmQ0tmUy5pX1ymIVrhbBtUcFX/exec';
const BASE_POINT = 'https://api.binance.com';
const BASE_POINT_FUTURES = 'http://fapi.binance.com'


const SAMPLE_DATA = [{
  symbol: 'SUSHIUSDT',
  markPrice: '1.34400000',
  indexPrice: '1.34410988',
  estimatedSettlePrice: '1.34294956',
  lastFundingRate: '0.00010000',
  interestRate: '0.00010000',
  nextFundingTime: 1665244800000,
  time: 1665236201008
},
{
  symbol: 'BTSUSDT',
  markPrice: '0.01056730',
  indexPrice: '0.01056714',
  estimatedSettlePrice: '0',
  lastFundingRate: '0.00010000',
  interestRate: '0.00010000',
  nextFundingTime: 1665244800000,
  time: 1665236201008
}];

const infoUrl = `${GOOGLE_SHEET_URI}`;

const getUrl = (symbol, price,) => {

};

const getCryptoPrices = async() => {
  // const url = `${BASE_POINT}/api/v3/ticker/price`;
  const crypto = `${BASE_POINT_FUTURES}/fapi/v1/premiumIndex`;

  const response = await axios.get(crypto, {});
  const pricesList = response.data;
  // const pricesList = SAMPLE_DATA;

  return pricesList;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const insertRowInSheet = async(priceObject) => {
  console.log('object: ', priceObject);
  console.log('symbol: ', priceObject.markPrice.toString());
  const payloadUrl = 
  `${GOOGLE_SHEET_URI}?symbol=${encodeURIComponent(priceObject.symbol)}&markPrice=${priceObject.markPrice.toString()}&indexPrice=${encodeURIComponent(priceObject.indexPrice.toString())}&estimatedSettlePrice=${encodeURIComponent(priceObject.estimatedSettlePrice.toString())}&interestRate=${encodeURIComponent(priceObject.interestRate.toString())}&nextFundingTime=${encodeURIComponent(priceObject.nextFundingTime.toString())}&time=${encodeURIComponent(priceObject.time.toString())}`;
  const response = await fetch(payloadUrl);
};

const insertEthData = async(priceList) => {
  const findObject = priceList.find(x=>x.symbol === 'ETHUSDT');
  await insertRowInSheet(findObject);
};

const insertBtcData = async(priceList) => {
  const findObject = priceList.find(x=>x.symbol === 'BTCUSDT');
  await insertRowInSheet(findObject);

};


const insertData = async () => {
  const cryptoPricesList = await getCryptoPrices();
  await insertEthData(cryptoPricesList);
  await insertBtcData(cryptoPricesList);
};

const runContinuous = async() => {
  while(1) {
    await insertData();
    await sleep(60000);
  }
};

const runOnce = async () => {
  await insertData();
};



runContinuous();


