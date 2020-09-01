import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MIN_SPEED, MAX_SPEED } from "../constants/speed"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`

const Button = styled.button`
  font-size: 15px;
  color: #444;
  background-color: #f8f8f8;
  padding: 10px 15px;
  border-radius: 50%;
  border: none;
  outline: none;
  touch-action: manipulation;
  user-select: none;
  width: 40px;
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

const getPosition = (speed, min, max) => {
  const position = (speed - min) / (max - min)
  return Math.floor(position * 100)
}

export default ({ speed, onSpeedChange, pause, onPause, onQuoteChange }) => {
  const [position, setPosition] = useState(
    getPosition(speed, MIN_SPEED, MAX_SPEED)
  )

  useEffect(() => {
    setPosition(getPosition(speed, MIN_SPEED, MAX_SPEED))
  }, [speed])

  const handleSpeed = multiplier => {
    const newSpeed = speed * multiplier
    if (newSpeed < MIN_SPEED || newSpeed > MAX_SPEED) return
    onSpeedChange(newSpeed)
  }

  return (
    <Wrapper>
      <FlexWrapper>
        <Button onClick={() => handleSpeed(0.9)}>-</Button>
        <Line>
          <LineAcross percentage={position} />
        </Line>
        <Button onClick={() => handleSpeed(1.1)}>+</Button>
      </FlexWrapper>
      <FlexWrapper>
        <Button onClick={() => onQuoteChange("back")}>{"<"}</Button>
        <Button onClick={onPause}>{pause ? <>&#9658;</> : "||"}</Button>
        <Button onClick={() => onQuoteChange("forward")}>{">"}</Button>
      </FlexWrapper>
    </Wrapper>
  )
}
