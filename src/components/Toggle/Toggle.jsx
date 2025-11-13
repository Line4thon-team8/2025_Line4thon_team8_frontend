// Toggle.jsx
import { useState, useCallback } from "react";
import styled, { css } from "styled-components";

const Toggle = ({value, onChange}) => { //주제별 리포트 -> false, 통합리포트 -> true
  const isControlled = typeof value === "boolean"; //부모가 제어
  const [inner, setInner] = useState(false);
  
  const isOn = isControlled ? value : inner;

  const setIsOn = useCallback(
    (next)=> {
      if(!isControlled) setInner(next);
      onChange?.(next);
    }, [isControlled, onChange]
  );

  const toggleHandler = useCallback(() => {
    setIsOn((v) => !v);
  }, [isOn, setIsOn]);

  const onKeyDown = (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      toggleHandler();
  }
};

  return (
    <ToggleWrap>
      <Switch
        $on={isOn}
        onClick={toggleHandler}
        role="switch"
        aria-checked={isOn}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <Track />

        {/* 내부 텍스트 */}
        <LabelIn $pos="left" $active={!isOn}>
          주제별 리포트
        </LabelIn>
        <LabelIn $pos="right" $active={isOn}>
          통합 리포트
        </LabelIn>

        <Knob $on={isOn} />
      </Switch>
    </ToggleWrap>
  );
};

export default Toggle;

const ToggleWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Switch = styled.button`
  position: relative;
  width: 332px;
  height: 56px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 100px;
  outline: none;
`;

const Track = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 100px;
  background-color: #fff;
`;

const Knob = styled.div`
  position: absolute;
  z-index: 1;
  width: 161px;
  height: 46px;
  left: 5px;
  bottom: 5px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.8);
  transition: transform 0.6s;
  transform: translateX(${(p) => (p.$on ? 160 : 0)}px);
`;

const LabelIn = styled.span`
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  pointer-events: none;

  ${(p) =>
    p.$pos === "left"
      ? css`
          left: 0;
        `
      : css`
          left: 50%;
        `}

  ${(p) =>
    p.$active
      ? css`
          color: #ffffff; 
        `
      : css`
          color: #868686;
        `}
`;