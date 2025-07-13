import { useEffect, useRef, useState } from 'react'
import { ConsolidatedOrderBook, Header } from './component'


function App() {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');

  const [consolidatedBook, setConsolidatedBook] = useState({
    last_updated: new Date().toLocaleString(),
    "symbol": selectedSymbol,
    "order_book": [
    ],
  });

  useEffect(() => {

    const socket = new WebSocket(BACKEND_URL + selectedSymbol);
    
    socket.onopen = () => {
      console.log("socket connected");
    }

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data);
      setConsolidatedBook(data);
      // console.log("Data : " , data)

    }

    socket.onclose = (event) => {
      console.log("Socket Closed");
    }

    return () => {
      socket.close();
    }

  }, [selectedSymbol]);


  return (
    <div className=' mx-auto bg-gradient-to-b from-purple-50 to-purple-50'>
      <Header last_updated={consolidatedBook.last_updated} />
      <ConsolidatedOrderBook selectedSymbol={selectedSymbol} setSelectedSymbol={setSelectedSymbol} consolidatedBook={consolidatedBook} />
    </div>
  )
}

export default App
