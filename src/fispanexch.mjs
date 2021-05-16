export async function getDataUSD() { 
    const host = 'api.frankfurter.app';
    let fetchRes = await fetch(`https://${host}/2021-04-15..?from=CAD`);
    let data = await fetchRes.json();
    return (data);
}
export async function displayDataUSD() {
    const display_data = await getDataUSD();
    const x1 = [];
    const y1 = [];
    for (let idx=15; idx<31; idx++){
        if (display_data.rates[`2021-04-${idx}`]==undefined){
            continue;
        }
        x1.push(display_data.rates[`2021-04-${idx}`].USD);
        y1.push([`2021-04-${idx}`]);
    }
    const x2 = [];
    const y2 = [];
    for (let idx=1; idx<15; idx++){
        if (display_data.rates[`2021-05-${idx}`]==undefined){
            continue;
        }
        x2.push(display_data.rates[`2021-05-${idx}`].USD);
        y2.push([`2021-05-${idx}`]);
    }
    const x0 = x1.concat(x2);
    const x01 = x1.concat(x2);
    x01.sort(function(a,b){return a-b})
    const median = x01.length%2!==0 ? x01[parseInt(x01.length/2)] :  (x01[(x01.length/2)] + x01[(x01.length/2)+1])/2 ; 
    const y0 = y1.concat(y2);

    let today = new Date().toISOString().slice(8, 10)
    let month = new Date().toISOString().slice(5, 7)
    // today's exchange rate 
    const todaydExchange = display_data.rates[`2021-${month}-${today-1}`].USD;
    const display = (todaydExchange - median) > 0 ?  'profitable' : 'not profitable';
    return {todaydExchange,display,median,x0,x01,y0};
}
// (async () => {
//     console.log(await displayDataUSD())
//   })()