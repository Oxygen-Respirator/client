import { SetStateAction, useEffect, useState } from "react";
import {
  SignButton,
  SignForm,
  SignH2,
  SignInput,
  SignP,
  SignWrap,
} from "./style";

import {
  useSignInMutation,
  useSignUpMutation,
} from "./signHook/signMutationHook";

export default function Sign({
  isSignModal,
  setIsSignModal,
}: {
  isSignModal: IsSignModal;
  setIsSignModal: React.Dispatch<SetStateAction<IsSignModal>>;
}) {
  const { up: isUpOpen, in: isInOpen } = isSignModal;
  const isModalOpen = isInOpen || isUpOpen;

  const [register, setRegister] = useState<SignUp>({
    userId: "",
    userPw: "",
    userNickname: "",
  });

  const [confirmPw, setConfirmPw] = useState<string>("");

  const { mutateAsync: signUpSubmit } = useSignUpMutation();
  const { mutateAsync: signInSubmit } = useSignInMutation();

  function onChangeInput({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) {
    setRegister(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInOpen) {
      const { userId, userPw } = register;
      const result = await signInSubmit({ userId, userPw });
      console.log(result);
    } else {
      const { userPw } = register;
      if (userPw !== confirmPw) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
      const result = await signUpSubmit(register);
      console.log(result);
    }
  };

  // const expirationTime = new Date();
  // expirationTime.setHours(expirationTime.getHours() + 24);
  // setCookie("token", "token", {
  //   path: "/",
  //   secure: true,
  //   expires: expirationTime,
  // });
  // location.href = "/";

  const isUpDisable =
    Object.values(register).some(_obj => _obj === "") || confirmPw === "";

  const isInDisable = !register.userId || !register.userPw;

  useEffect(() => {
    setRegister({
      userId: "",
      userPw: "",
      userNickname: "",
    });
    setConfirmPw("");
  }, [isSignModal]);

  const onClickNotSubBtn = () => {
    if (isUpOpen) {
      setIsSignModal({ up: false, in: true });
    } else {
      setIsSignModal({ up: true, in: false });
    }
  };

  if (!isModalOpen) {
    return;
  }

  return (
    <SignWrap>
      <SignForm onSubmit={onSubmit}>
        <div>
          <SignH2>환영합니다!</SignH2>
          <SignP>회원이 되면 모든 서비스를 이용하실 수 있습니다.</SignP>
        </div>
        <SignInput
          onChange={onChangeInput}
          placeholder="닉네임"
          $signIn={isInOpen}
          value={register.userNickname}
          name="userNickname"
          type="text"
        />
        <SignInput
          onChange={onChangeInput}
          placeholder="아이디"
          value={register.userId}
          name="userId"
          type="text"
        />
        <SignInput
          onChange={onChangeInput}
          placeholder="비밀번호"
          value={register.userPw}
          name="userPw"
          type="password"
        />
        <SignInput
          onChange={({ target: { value } }) => setConfirmPw(value)}
          placeholder="비밀번호 확인"
          $signIn={isInOpen}
          value={confirmPw}
          type="password"
        />
        <SignButton
          $isDisable={isUpOpen ? isUpDisable : isInDisable}
          disabled={isUpOpen ? isUpDisable : isInDisable}
        >
          {isInOpen ? "로그인하기" : "가입하기"}
        </SignButton>
        <SignButton $reverse={true} type="button" onClick={onClickNotSubBtn}>
          {isInOpen ? "회원가입" : "다음에 할래요"}
        </SignButton>
      </SignForm>
    </SignWrap>
  );
}
