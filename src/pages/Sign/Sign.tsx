import { useState } from "react";
import { styled } from "styled-components";
import { Button, Input, SignWrap } from "./style";

export default function Sign() {
  const [signIn, setSignIn] = useState<SignIn>({
    userId: "",
    userPw: "",
  });

  function onChangeInput({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) {
    setSignIn(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SignWrap>
      <Form onSubmit={onSubmit}>
        <InputSignIn
          onChange={onChangeInput}
          placeholder="아이디"
          value={signIn.userId}
          name="userId"
          type="text"
        />
        <InputSignIn
          onChange={onChangeInput}
          placeholder="비밀번호"
          value={signIn.userPw}
          name="userPw"
          type="password"
        />
        <SignInButton $reverse={true}>로그인</SignInButton>
        <SignInButton type="button">회원가입</SignInButton>
      </Form>
    </SignWrap>
  );
}

const InputSignIn = styled(Input)`
  display: block;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const SignInButton = styled(Button)`
  margin: ${({ $reverse }) => ($reverse ? "80px 0 20px 0" : "0")};
  border: 1px solid;
  padding: 20px 0;
  width: 100%;
  border-radius: 20px;
`;
