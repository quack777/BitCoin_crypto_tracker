import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../routes/atom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  & > span {
    font-size: 28px;
  }
`;

const ToggleTheme = styled.label`
  position: relative;
  display: inline-block;
  height: 34px;
  width: 60px;
  & > input {
    display: none;
  }
  & > input:checked + .slider::before {
    transform: translate(26px);
  }
  & > input:checked + .slider {
    background-color: cornflowerblue;
  }
`;

const SliderRound = styled.div`
  background-color: #ccc;
  position: absolute;
  cursor: pointer;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition: 0.2s;
  border-radius: 34px;
  &::before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
    border-radius: 50%;
  }
`;

const DarkMode = () => {
  const toggleDarkMode = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Container>
      <span>☀️</span>
      <ToggleTheme className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={() => toggleDarkMode((cur) => !cur)}
          defaultChecked={isDark}
        />
        <SliderRound className="slider"></SliderRound>
      </ToggleTheme>
      <span>🌒</span>
    </Container>
  );
};

export default DarkMode;
