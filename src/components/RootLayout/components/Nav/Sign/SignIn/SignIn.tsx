import { useState } from "react";
import { styled } from "styled-components";
import { SignButton, SignForm, SignInput, SignWrap } from "../style";
import { useSignInMutation } from "../signHook/signMutationHook";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState<SignIn>({
    userId: "",
    userPw: "",
  });

  const { mutateAsync: signInSubmit } = useSignInMutation();

  function onChangeInput({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) {
    setSignIn(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signInSubmit(signIn);
    console.log(result);
  };

  const isDisable = Object.values(signIn).some(_obj => _obj === "");

  return (
    <SignWrap>
      <SignForm onSubmit={onSubmit}>
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
        <SignInButton
          $reverse={true}
          $isDisable={isDisable}
          disabled={isDisable}
        >
          로그인
        </SignInButton>
        <SignInButton
          type="button"
          onClick={() => {
            navigate("up");
          }}
        >
          회원가입
        </SignInButton>
      </SignForm>
    </SignWrap>
  );
}

const InputSignIn = styled(SignInput)`
  padding: 20px 40px;
  margin-bottom: 10px;
  font-size: 22px;
`;

const SignInButton = styled(SignButton)`
  margin: ${({ $reverse }) => ($reverse ? "50px 0 20px 0" : "0")};
  border: 1px solid;
  padding: 20px 0;
  width: 100%;
  border-radius: 20px;
  font-size: 22px;
`;
