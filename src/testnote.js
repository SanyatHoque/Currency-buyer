useEffect(() => {
    async function getDataUSD() { 
        const host = 'api.frankfurter.app';
        let fetchRes = await fetch(`https://${host}/2021-04-15..?from=CAD`);
        let data = await fetchRes.json();
        return (data);
    }
    async function displayDataUSD() {
        const display_data = await getDataUSD();
        return display_data;
    }
    (async () => {
        const dataUSD = await displayDataUSD();
        // console.log(dataUSD)
        setData(dataUSD);
      })()
      console.log('data',data)
},[isClicked]);    