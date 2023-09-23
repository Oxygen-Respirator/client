import { styled } from "styled-components";

export const SignInput = styled.input<{ $signIn?: boolean }>`
  border: 1px solid ${({ theme: { color } }) => color.borderColor};
  border-radius: 5px;
  display: ${({ $signIn }) => ($signIn ? "none" : "block")};
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  &:focus {
    border-color: ${({ theme: { color } }) => color.mainColor};
  }
  margin-bottom: 10px;
`;

export const SignForm = styled.form`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 80px;
  border-radius: 10px;
`;

export const SignButton = styled.button<{
  $reverse?: boolean;
  $isDisable?: boolean;
}>`
  background: ${({ theme: { color }, $reverse, $isDisable }) => {
    return $isDisable ? color.borderColor : $reverse ? "" : color.mainColor;
  }};
  color: ${({ theme: { color }, $reverse, $isDisable }) =>
    $isDisable ? "white" : $reverse ? color.mainColor : "white"};
  border-color: ${({ theme: { color }, $reverse, $isDisable }) =>
    $isDisable ? "white" : $reverse ? color.mainColor : "none"};
  border-radius: ${({ theme: { border } }) => border.defaultRadius};
  border: 1px solid;
  display: block;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
  width: 100%;
  margin-top: 10px;
  &:first-of-type {
    margin-top: 50px;
  }
`;

export const SignWrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  background: ${({ theme: { color } }) => color.opacityBg};
  z-index: 9999;
  @media screen and (max-width: 768px) {
    background: white;
  }
`;

export const SignH2 = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

export const SignP = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
`;
