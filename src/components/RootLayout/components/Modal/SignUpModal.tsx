import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/apis/auth";
import styled from "styled-components";
import { signUpModalOpenAtom } from "@/atom/modal";
import { useSetRecoilState } from "recoil";

const SignUpModal = () => {
  const setSignUpModalOpen = useSetRecoilState(signUpModalOpenAtom);
  const [userNickname, setuserNickname] = useState<string | null>(null);
  const [userId, setuserId] = useState<string | null>(null);
  const [userPw, setUserPw] = useState<string | null>(null);

  const handleuserNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setuserNickname(e.target.value);
  };

  const handleuserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setuserId(e.target.value);
  };

  const handleUserPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };
  const signUpMutation = useMutation(
    (data: { userId: string; userPw: string; userNickname: string }) =>
      signUp(data),
    {
      onSuccess: () => {
        setSignUpModalOpen(false);
      },
    },
  );
  const handleSignUp = async () => {
    if (!userNickname) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (!userId) {
      alert("아이디를 입력해주세요");
      return;
    }
    if (!userPw) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    const data = {
      userId,
      userPw,
      userNickname,
    };
    await signUpMutation.mutate(data);
  };
  return (
    <SignUpModalContainer>
      <SignUpModalWrap>
        <div>
          <TitleText>환영합니다!</TitleText>
          <SubTitleText>
            회원이 되면 모든 서비스를 이용하실 수 있습니다.
          </SubTitleText>
        </div>

        <CustomInput
          type="text"
          id="userNickname"
          onChange={handleuserNicknameChange}
          maxLength={10}
          placeholder="닉네임을 입력해주세요"
        />

        <CustomInput
          type="text"
          id="userId"
          onChange={handleuserIdChange}
          placeholder="아이디를 입력해주세요"
        />

        <CustomInput
          type="password"
          id="userPw"
          onChange={handleUserPwChange}
          placeholder="비밀번호를 입력해주세요"
        />
        <SignUpBtn onClick={handleSignUp}>회원가입</SignUpBtn>
        <CloseBtn
          onClick={() => {
            setSignUpModalOpen(false);
          }}
        >
          다음에 할래요
        </CloseBtn>
      </SignUpModalWrap>
    </SignUpModalContainer>
  );
};

export default SignUpModal;

const SignUpModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
`;

const SignUpModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 470px;
  background-color: #fff;
  padding: 5rem;
  padding-bottom: 3rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CustomInput = styled.input`
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  width: 100%;
`;

const TitleText = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const SubTitleText = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const SignUpBtn = styled.button`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background-color: #3c71fe;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
`;

const CloseBtn = styled.button`
  color: #666;
  margin-top: 3rem;
`;
