import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ALL_QUOTES } from "../constants/quotes"

const Quotes = styled.div`
  height: 95vh;
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`
const Quote = styled.div``
const P = styled.p`
  margin: 5px;
`
const Em = styled.p`
  color: #ddd;
  font-size: 25px;
  margin: 15px;
  font-style: italic;
`
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Button = styled.button`
  font-size: 25px;
  color: #444;
  background-color: #f8f8f8;
  padding: 15px 23px;
  border-radius: 50%;
  border: none;
  outline: none;
`

const Line = styled.div`
  border-bottom: 5px solid #f3f3f3;
  height: 1px;
  width: 100%;
  position: relative;
`

const LineAcross = styled.div`
  border-right: 3px solid #444;
  height: 10px;
  width: 1px;
  margin-top: -2px;
  position: absolute;
  left: ${p => p.percentage}%;
`

const addRandomQuote = (quotes, quotesHistory) => {
  const newQuotes = quotes.filter(quote => !quotesHistory.includes(quote))
  const newQuote = newQuotes[Math.floor(Math.random() * newQuotes.length)]
  if (quotes.length - 1 === quotesHistory.length) return [newQuote]
  return [newQuote, ...quotesHistory]
}

const formatQuote = quote => {
  const formatedQuote = quote.quote.split("/n").map(row => <P>{row}</P>)
  return (
    <Quote>
      {formatedQuote}
      {quote.author && <Em>- {quote.author}</Em>}
    </Quote>
  )
}

const getPosition = (speed, min, max) => {
  const position = (speed - min) / (max - min)
  return Math.floor(position * 100)
}

export default ({}) => {
  const MAX_SPEED = 20000
  const MIN_SPEED = 50
  const [speed, setSpeed] = useState(2000)
  const [position, setPosition] = useState(
    getPosition(speed, MIN_SPEED, MAX_SPEED)
  )
  const [count, setCount] = useState(0)
  const [quotesHistory, setQuotesHistory] = useState(
    addRandomQuote(ALL_QUOTES, [])
  )
  const updateQuote = () =>
    setQuotesHistory(addRandomQuote(ALL_QUOTES, quotesHistory))

  const handleSpeed = multiplier => {
    const newSpeed = speed * multiplier
    if (newSpeed < MIN_SPEED || newSpeed > MAX_SPEED) return
    setSpeed(newSpeed)
  }

  useEffect(() => {
    setPosition(getPosition(speed, MIN_SPEED, MAX_SPEED))
  }, [speed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1)
      updateQuote()
    }, speed)
    return () => clearTimeout(timer)
  }, [count])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(0)
    }, speed)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Quotes>
        <div></div>
        <h2>{formatQuote(quotesHistory[0])}</h2>
        <Buttons>
          <Button onClick={() => handleSpeed(0.9)}>-</Button>
          <Line>
            <LineAcross percentage={position} />
          </Line>
          <Button onClick={() => handleSpeed(1.1)}>+</Button>
        </Buttons>
      </Quotes>
    </>
  )
}
