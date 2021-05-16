const fetch = require("node-fetch");
async function getDataUSD() { 
    const host = 'api.frankfurter.app';
    let fetchRes = await fetch(`https://${host}/2021-04-15..?to=USD`);
    let data = await fetchRes.json();
    return (data);
}
async function displayDataUSD() {
    const display_data = await getDataUSD();
    const x1 = [];
    const y1 = [];
    for (let idx=15; idx<31; idx++){
        if (display_data.rates[`2021-04-${idx}`]==undefined){
            continue;
        }
        x1.push(Object.values(display_data.rates[`2021-04-${idx}`]));
        y1.push([`2021-04-${idx}`]);
    }
    const x2 = [];
    const y2 = [];
    for (let idx=1; idx<15; idx++){
        if (display_data.rates[`2021-05-${idx}`]==undefined){
            continue;
        }
        x2.push(Object.values(display_data.rates[`2021-05-${idx}`]));
        y2.push([`2021-05-${idx}`]);
    }
    const x0 = x1.concat(x2);
    const x01 = x1.concat(x2);
    x01.sort(function(a,b){return a-b})
    const median = x01.length%2!==0 ? x01[parseInt(x01.length/2)] :  (x01[(x01.length/2)] + x01[(x01.length/2)+1])/2 ; 
    // console.log(x01.length%2)
    // console.log(x01[parseInt(x01.length/2)])
    // if (x01.length%2!==0) {
    //     console.log(x01[(x01.length/2)+1])
    // } else {
    //     console.log((x01[(x01.length/2)] + x01[(x01.length/2)+1])/2);
    // } 
    const y0 = y1.concat(y2);
    return {median,x0,y0};
}
// (async () => {
//     console.log(await displayDataCAD())
//   })()
module.exports.getDataUSD = getDataUSD;
module.exports.displayDataUSD = displayDataUSD;
// TESTING
//     const host = 'api.frankfurter.app';
//     let fetchRes = fetch(`https://${host}/2021-04-15..?to=USD`)
//     .then((res)=>res.json())
//     .then((x)=>console.log(x));