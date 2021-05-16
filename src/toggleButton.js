import './display.css';
import React,{useEffect,useState} from "react";
import LineChart from './LineChart';
export const ThemeContext = React.createContext();
function ToggleButton() {
    const [isClicked, setIsClicked] = useState(false)
    var [data,setData] = useState({});
    const clicked = ()=>{
        setIsClicked(!isClicked)
    }
    useEffect(() => {
        async function getDataUSD() { 
            const host = 'api.frankfurter.app';
            let fetchRes = await fetch(`https://${host}/2021-04-15..?from=CAD`);
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
            const backup_today = display_data.rates[`2021-${month}-${today-1}`]==undefined ? 2:3; 
            // console.log('backup_today',backup_today)
            const latestAPIDate = `2021-${month}-${today-backup_today}`;
            const todaysExchange = display_data.rates[`2021-${month}-${today-backup_today}`].USD;
            const display = (todaysExchange - median) > 0 ?  'profitable' : 'not profitable';
            return {todaysExchange,latestAPIDate,median,x0,x01,y0};
        }
        (async () => {
            setData(await displayDataUSD());
          })()
    },[isClicked]);    
  return (
    <ThemeContext.Provider value={{data:data}}>
    <div className="App">
    <LineChart />
    <div id="div1">
        <input type="checkbox" onClick={clicked} className="checkbox" id="checkbox"/>
        <label for="checkbox" className="label">
                <i className="fas fa-moon"></i>
                <i className="fas da-sun"></i>
                <div className="ball"></div>
        </label>
    </div>
           {isClicked ? (
            <div>
            <h3>Buy Mode</h3>
            <p>Latest obtained Exchange Rate for date {data.latestAPIDate} is {data.todaysExchange}</p>
            <p>the median of the exchange rate of approximately last 30 days, {data.median}</p> 
            <p>{!data.display=='profitable'? <p className="profit">Since today's Exchange Rate is lesser than median, its Profitable to Buy</p>:<p className="profit">Since today's Exchange Rate is greater than median, its Not profitable to Buy</p>}
             </p>
            </div>
        ):(
            <div>
            <h3>Sell Mode</h3>
            <p>Latest obtained Exchange Rate for date {data.latestAPIDate} is {data.todaysExchange}</p>
            <p>the median of the exchange rate of approximately last 30 days, {data.median}</p> 
            <p>{!data.display=='profitable'? <p className="profit">Since today's Exchange Rate is lesser than median, its Not profitable to Sell</p>:<p className="profit">Since today's Exchange Rate is greater than median, its Profitable to Sell</p>}
             </p>
            </div>
        )}
    </div>
    </ThemeContext.Provider>
  )};
export default ToggleButton;
