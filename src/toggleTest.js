let displayDataCAD = require('./fispanCAD')
let displayDataUSD = require('./fispanUSD')
let displayDataUSD = require('./fispanexch')
// var fx = require('./node_modules/money/money');
// fx.base = "USD";
// fx.rates = {
//     "EUR" : 0.745101, // eg. 1 USD === 0.745101 EUR
//     "GBP" : 0.647710, // etc...
//     "HKD" : 7.781919,
//     "USD" : 1,        // always include the base rate (1:1)
//     /* etc */
// }


;(async () => {
    // dataCAD = await displayDataCAD.displayDataCAD();
    // console.log(dataCAD.median)
    dataUSD = await displayDataUSD.displayDataUSD();
    console.log(dataUSD)
  })()
//   const ans = fx(1).convert({ from:"USD", to:"EUR" });
// console.log(ans)