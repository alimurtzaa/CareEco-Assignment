const BACKEND_URL = "https://mkgdh1sm-8000.inc1.devtunnels.ms/";
import axios from "axios"


export const getExchangeData = async (symbol) => {
    console.log("SYMBOL : " , symbol)
    let result = {
        last_updated: new Date(),
        "symbol": symbol,
        "order_book": [
      
        ],
    };    

    try {
        const res = await axios.get(BACKEND_URL + "api/orderbook/" + symbol);

        console.log("RES : ", res);
        result = res.data
        
    } catch (error) {
        console.log(error)
    }

    return result;
}