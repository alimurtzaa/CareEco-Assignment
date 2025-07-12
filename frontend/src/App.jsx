import { useEffect, useRef, useState } from 'react'
import { ConsolidatedOrderBook, Header } from './component'
import { getExchangeData } from './services/api'


function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [time, setTime] = useState(true);
  const symbolRef = useRef(selectedSymbol);

  const [consolidatedBook, setConsolidatedBook] = useState({
    last_updated: new Date(),
    "symbol": selectedSymbol,
    "order_book": [

    ],
  })


  useEffect(() => {
    symbolRef.current = selectedSymbol;
  }, [selectedSymbol]);


  useEffect(() => {
    getExchangeData(symbolRef.current).then(data => {
      setConsolidatedBook(data);
    });
  }, []);


  const intervalRef = useRef(null); // to store interval ID

  useEffect(() => {
    // Clear previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Create new AbortController for each symbol change
    const controller = new AbortController();

    // Define a polling function that runs every 3 seconds
    const fetchAndUpdate = async () => {
      try {
        const data = await getExchangeData(symbolRef.current, controller.signal);
        setConsolidatedBook(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Previous API call aborted');
        } else {
          console.error('API call failed:', error);
        }
      }
    };

    // Call immediately
    fetchAndUpdate();

    // Set interval to keep polling every 3 seconds
    intervalRef.current = setInterval(fetchAndUpdate, 3000);

    // Cleanup function
    return () => {
      clearInterval(intervalRef.current);
      controller.abort(); // cancel in-flight request
    };
  }, [selectedSymbol]);


  return (
    <div className=' mx-auto bg-gradient-to-b from-purple-50 to-purple-50'>
      <Header last_updated={consolidatedBook.last_updated} />
      <ConsolidatedOrderBook selectedSymbol={selectedSymbol} setSelectedSymbol={setSelectedSymbol} consolidatedBook={consolidatedBook} />
    </div>
  )
}

export default App
