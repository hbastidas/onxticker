#!/usr/bin/env node
let Ticker = require('../index');
let ticker = new Ticker();

//running
process.argv.slice(2).forEach(element => {
  ticker.price(element.toUpperCase()).then(data=>{
    console.log(data);
  });
});

if(process.argv.slice(2).length==0){
  process.stdout.write("use a usd or vef argument\n\r");
}
