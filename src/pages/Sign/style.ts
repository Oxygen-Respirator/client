import { styled } from "styled-components";

styled;

export const Input = styled.input`
  border: 1px solid ${({ theme: { color } }) => color.borderColor};
  display: block;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const Button = styled.button<{ $reverse?: boolean }>`
  background: ${({ theme: { color }, $reverse }) =>
    $reverse ? "" : color.mainColor};
  color: ${({ theme: { color }, $reverse }) =>
    $reverse ? color.mainColor : "white"};
  border-color: ${({ theme: { color }, $reverse }) =>
    $reverse ? color.mainColor : "none"};
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
`;
