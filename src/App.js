import React, {useEffect, useState} from 'react'
import CurrencyRow from './CurrencyRow'
import './App.css';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {


  const [currencyOptions, setCurrencyOptions] = useState([]) 
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate || 0
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate || 0
  }

  useEffect(
    
    
    
    () => {
   fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {

      

      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]) //putting all the currencies together
      
      setFromCurrency(data.base) //eur
      setToCurrency(firstCurrency) // cad
      setExchangeRate(data.rates[firstCurrency]) // 1.48
    })
    }
    
    
    
    
    , []
    
    
    
    )

    useEffect(() => {
      if (fromCurrency !== undefined && toCurrency !== undefined ) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }, [fromCurrency, toCurrency])


    function handleFromAmountChange(e) {

      setAmount(e.target.value)    
      setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
    }


  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={fromCurrency} 
        onChangeCurrency={e => setFromCurrency(e.target.value)} 
        amount={fromAmount} 
        onChangeAmount={handleFromAmountChange} 
      />
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={toCurrency} 
        onChangeCurrency={e => setToCurrency(e.target.value)} 
        amount={toAmount} 
        onChangeAmount={handleToAmountChange}
      />
    </>
    
  );
}

export default App;
