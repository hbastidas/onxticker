#!/usr/bin/env node
const Ticker = require('../index');
const ticker = new Ticker();
const i18n = require("i18n");
const osLocale = require('os-locale');


i18n.configure({
    locales:['en_US'], //add here your translate file..
    register: global,
    directory: __dirname + '/../locales'
});

(async () => {
	let syslocale=await osLocale();
  i18n.setLocale(syslocale);
  //running
  process.argv.slice(2).forEach(element => {
    ticker.price(element.toUpperCase()).then(data=>{
      console.log(__("buy")+": "+data.buy);
      console.log(__("sell")+": "+data.sell);
    }).catch(err=>{
      console.log(err)
    });
  });

  if(process.argv.slice(2).length==0){
    console.log(__("use a usd or vef argument"));
  }
})();
