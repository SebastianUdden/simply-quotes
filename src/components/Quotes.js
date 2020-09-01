import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ALL_QUOTES } from "../constants/quotes"
import { DEFAULT_SPEED } from "../constants/speed"
import SpeedHandler from "./SpeedHandler"
import Tags from "./Tags"

const Quotes = styled.div`
  height: 84vh;
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  @media screen and (orientation: landscape) {
    height: 100vh;
  }
`
const Quote = styled.div``
const Controller = styled.div`
  width: 100%;
`
const P = styled.p`
  margin: 5px;
`
const Em = styled.p`
  color: #ddd;
  font-size: 25px;
  margin: 15px;
  font-style: italic;
`

const addRandomQuote = (quotes, quotesHistory) => {
  const newQuotes = quotes.filter(quote => !quotesHistory.includes(quote))
  const newQuote = newQuotes[Math.floor(Math.random() * newQuotes.length)]
  if (quotes.length - 1 === quotesHistory.length) return [newQuote]
  if (quotes.length === 1) {
    return [quotes[0]]
  }
  return [newQuote, ...quotesHistory]
}

const formatQuote = quote => {
  const formatedQuote =
    quote && quote.quote.split("/n").map(row => <P>{row}</P>)
  return (
    <Quote>
      {formatedQuote}
      {quote && quote.author && <Em>- {quote.author}</Em>}
    </Quote>
  )
}

const filterQuotes = (quotes, tags) => {
  if (tags.length === 0) return quotes
  return quotes.filter(Boolean).filter(({ quote, author, tags: tgs }) =>
    tags.every(tag => {
      const lcQuote = quote ? quote.toLowerCase() : ""
      const lcAuthor = author ? author.toLowerCase() : ""
      const lcTag = tag.toLowerCase()
      return (
        lcQuote.includes(lcTag) ||
        lcAuthor.includes(lcTag) ||
        (tgs && tgs.some(t => t === lcTag))
      )
    })
  )
}

export default ({}) => {
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [pause, setPause] = useState(false)

  const [count, setCount] = useState(0)
  const [filteredQuotes, setFilteredQuotes] = useState(ALL_QUOTES)
  const [quotesHistory, setQuotesHistory] = useState(
    addRandomQuote(filteredQuotes, [])
  )
  const [tags, setTags] = useState([])

  const handleQuoteChange = direction => {
    if (direction === "forward") {
      updateQuote()
      return
    }

    const hasQuoteHistory = quotesHistory.length !== 1
    if (hasQuoteHistory) {
      setQuotesHistory(quotesHistory.slice(1))
      return
    }
    updateQuote()
  }
  const updateQuote = () =>
    setQuotesHistory(addRandomQuote(filteredQuotes, quotesHistory))

  useEffect(() => {
    const filtered = filterQuotes(ALL_QUOTES, tags)
    setFilteredQuotes(filtered)
    const filteredHistory = filterQuotes(quotesHistory, tags)
    if (!filteredHistory.length) {
      setQuotesHistory(addRandomQuote(filtered, quotesHistory))
      return
    }
    setQuotesHistory(filteredHistory)
    handleQuoteChange("forward")
  }, [tags])

  useEffect(() => {
    if (pause) return
    const timer = setTimeout(() => {
      setCount(count + 1)
      updateQuote()
    }, speed)
    return () => clearTimeout(timer)
  }, [count, pause])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(0)
    }, speed)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const showQuote =
    filteredQuotes.length === 1 ? filteredQuotes[0] : quotesHistory[0]
  return (
    <>
      <Quotes>
        <div></div>
        <h2>
          {showQuote ? formatQuote(showQuote) : "No quotes matching filter..."}
        </h2>
        <Controller>
          <Tags tags={tags} onTagsChange={tags => setTags(tags)} />
          {filteredQuotes.length > 1 && (
            <SpeedHandler
              speed={speed}
              pause={pause}
              onPause={() => setPause(!pause)}
              onSpeedChange={speed => setSpeed(speed)}
              onQuoteChange={handleQuoteChange}
            />
          )}
        </Controller>
      </Quotes>
    </>
  )
}
