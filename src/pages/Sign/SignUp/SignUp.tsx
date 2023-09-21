import { useState } from "react";
import { styled } from "styled-components";
import { Button, Input, SignWrap } from "../style";
import { useSignUpMutation } from "../signHook/signMutationHook";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState<SignUp>({
    userId: "",
    userPw: "",
    userNickname: "",
  });

  const [confirmPw, setConfirmPw] = useState<string>("");

  const { mutateAsync: signUpSubmit } = useSignUpMutation();

  function onChangeInput({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) {
    setSignUp(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userPw } = signUp;
    if (userPw !== confirmPw) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    const result = await signUpSubmit(signUp);
    console.log(result);
  };

  const isDisable =
    Object.values(signUp).some(_obj => _obj === "") || confirmPw === "";

  return (
    <SignWrap>
      <Form onSubmit={onSubmit}>
        <InputSignUp
          onChange={onChangeInput}
          placeholder="닉네임"
          value={signUp.userNickname}
          name="userNickname"
          type="text"
        />
        <InputSignUp
          onChange={onChangeInput}
          placeholder="아이디"
          value={signUp.userId}
          name="userId"
          type="text"
        />
        <InputSignUp
          onChange={onChangeInput}
          placeholder="비밀번호"
          value={signUp.userPw}
          name="userPw"
          type="password"
        />
        <InputSignUp
          onChange={({ target: { value } }) => setConfirmPw(value)}
          placeholder="비밀번호 확인"
          value={confirmPw}
          type="password"
        />
        <BtnWrap>
          <SignUpButton $isDisable={isDisable} disabled={isDisable}>
            가입하기
          </SignUpButton>
          <SignUpButton
            $reverse={true}
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </SignUpButton>
        </BtnWrap>
      </Form>
    </SignWrap>
  );
}

const BtnWrap = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 50px;
`;

const InputSignUp = styled(Input)`
  padding: 20px 40px;
  margin-bottom: 10px;
  font-size: 22px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const SignUpButton = styled(Button)`
  border: 1px solid;
  padding: 20px 0;
  width: 100%;
  border-radius: 20px;
  font-size: 22px;
`;
