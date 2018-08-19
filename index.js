/**
 *  onx module for price Exchange
 *  requiere solo los precios de yobit-exchange y localbitcoin
 */

const axios = require('axios');

function OnxTicker(){
  this.data_yobit={}
  this.databitcoin=undefined;
}

OnxTicker.prototype.getavg=function(currency){
  let data=new Array();
  data.push(parseFloat(this.databitcoin[currency]['avg_1h']))
  data.push(parseFloat(this.databitcoin[currency]['avg_6h']))
  data.push(parseFloat(this.databitcoin[currency]['avg_12h']))
  data.push(parseFloat(this.databitcoin[currency]['avg_24h']))
  return data.sort((a, b) => b - a);
}


OnxTicker.prototype.price=async function(currency){
  const onx_btc = axios("https://yobit.net/api/2/onx_btc/ticker");
  const btc_usd = axios("https://yobit.net/api/2/btc_usd/ticker");
  const bitcoinaverage = axios("https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/");

  const [yonx, ybtc, localbitcoin] = await Promise.all([onx_btc, btc_usd, bitcoinaverage]).catch(error => {
    throw (error.response.status + " in "+ this.url)
  });

  this.data_yobit.btc_onx=yonx.data;
  this.data_yobit.btc_usd=ybtc.data;
  this.databitcoin=localbitcoin.data;
  //get average price from bitcoin/usd in localbitcoin descending major to minor
  let avg=this.getavg(currency);
  return {sell: (Number(this.data_yobit.btc_onx.ticker.sell) * avg[0] ), buy: (Number(this.data_yobit.btc_onx.ticker.buy) * avg[0])};
}

module.exports = OnxTicker;
