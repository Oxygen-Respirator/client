import { styled } from "styled-components";

export const SignInput = styled.input`
  border: 1px solid ${({ theme: { color } }) => color.borderColor};
  border-radius: ${({ theme: { border } }) => border.defaultRadius};
  display: block;
  width: 100%;
`;

export const SignForm = styled.form`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 70px;
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
`;
