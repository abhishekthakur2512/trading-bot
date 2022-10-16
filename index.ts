require('dotenv').env
import { SAMPLE_DATA } from "./sample_data";
const ccxt = require('ccxt');
const axios = require('axios');



const record = async () => {
  // const url = `${BASE_POINT}/api/v3/ticker/price`;
  // const response = await axios.get(url, payload);
  // const data = response.data;

  const data = SAMPLE_DATA;
  return data;
}

record();