import styled from "styled-components";
import { MIN_SPEED, MAX_SPEED } from "../constants/speed";

const formatSpeed = (speed: number) => {
  if (speed < 1000) return `${Math.floor(speed)}ms`;
  else return `${Math.floor(speed / 100) / 10}s`;
};

interface ISpeedHandler {
  speed: number;
  onSpeedChange: (speed: number) => void;
  pause: boolean;
  onPause: () => void;
  onQuoteChange: (direction: string) => void;
}

const SpeedHandler = ({
  speed,
  onSpeedChange,
  pause,
  onPause,
  onQuoteChange,
}: ISpeedHandler) => {
  const handleSpeed = (multiplier: number) => {
    const newSpeed = speed * multiplier;
    if (newSpeed < MIN_SPEED || newSpeed > MAX_SPEED) return;
    onSpeedChange(newSpeed);
  };

  return (
    <Wrapper>
      <Wrapper>
        <Speed>{formatSpeed(speed)}</Speed>
      </Wrapper>
      <FlexWrapper>
        <Button onClick={() => handleSpeed(0.9)}>-</Button>
        <RangeSlider
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
        <Button onClick={() => handleSpeed(1.1)}>+</Button>
      </FlexWrapper>
      <FlexWrapper>
        <Button onClick={() => onQuoteChange("back")}>{"<"}</Button>
        <Button onClick={onPause}>{pause ? <>&#9658;</> : "||"}</Button>
        <Button onClick={() => onQuoteChange("forward")}>{">"}</Button>
      </FlexWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const Button = styled.button`
  font-size: 15px;
  color: #fff;
  background-color: #000;
  padding: 10px 15px;
  border-radius: 50%;
  border: none;
  outline: none;
  touch-action: manipulation;
  user-select: none;
  width: 40px;
`;

const RangeSlider = styled.input`
  margin: -1px;
  width: 100%;
  appearance: none;
  height: 5px;
  background-color: #000;
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
    background-color: #fff;
    cursor: pointer;
  }
`;

const Speed = styled.span`
  font-size: 12px;
  margin-bottom: -25px;
  color: #fff;
`;

export default SpeedHandler;
