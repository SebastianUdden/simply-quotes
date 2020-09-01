import React from "react"
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

const RangeSlider = styled.input`
  margin: -1px;
  width: 100%;
  appearance: none;
  height: 5px;
  background-color: #f3f3f3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  :hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    margin-top: -2px;
    width: 5px;
    height: 15px;
    background-color: #444;
    cursor: pointer;
  }
`

export default ({ speed, onSpeedChange, pause, onPause, onQuoteChange }) => {
  const handleSpeed = multiplier => {
    const newSpeed = speed * multiplier
    if (newSpeed < MIN_SPEED || newSpeed > MAX_SPEED) return
    onSpeedChange(newSpeed)
  }

  return (
    <Wrapper>
      <FlexWrapper>
        <Button onClick={() => handleSpeed(0.9)}>-</Button>
        <RangeSlider
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={speed}
          onChange={e => onSpeedChange(e.target.value)}
        />
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
