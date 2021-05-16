let displayDataUSD = require('./fispanexch')

;(async () => {
    const dataUSD = await displayDataUSD.displayDataUSD();
    console.log(dataUSD)
  })()

exports.dataUSD = dataUSD;
