import { SetStateAction, useEffect, useState } from "react";
import * as S from "./style";

import { AxiosError } from "axios";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../authHook/userAuthMutation";

export default function Sign({
  isSignModal,
  setIsSignModal,
}: {
  isSignModal: IsSignModal;
  setIsSignModal: React.Dispatch<SetStateAction<IsSignModal>>;
}) {
  const { up: isUpOpen, in: isInOpen } = isSignModal;
  const isModalOpen = isInOpen || isUpOpen;

  const [register, setRegister] = useState<Sign>({
    userId: "",
    userPw: "",
    userNickname: "",
    confirmPw: "",
  });

  const { mutateAsync: signUpSubmit } = useSignUpMutation();
  const { mutateAsync: signInSubmit } = useSignInMutation();

  const onChangeInput =
    (name: keyof Sign) =>
    ({ target: { value } }: { target: { value: string } }) => {
      if (value === "") {
        setRegister(prev => ({ ...prev, [name]: value }));
        return;
      }
      if (name === "userNickname") {
        const nickRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
        const isNickValid = nickRegex.test(value);
        if (isNickValid) {
          if (value.length > 10) {
            return;
          }
          setRegister(prev => ({ ...prev, [name]: value }));
        }
        return;
      }
      if (value.length > 12) {
        return;
      }

      const regex = /^[a-zA-Z0-9]+$/;
      const isValid = regex.test(value);
      if (isValid) {
        setRegister(prev => ({ ...prev, [name]: value }));
      }
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId, userPw, confirmPw, userNickname } = register;
    if (isInOpen) {
      await signInSubmit(
        { userId, userPw },
        {
          onSuccess: result => {
            const { headers } = result;
            localStorage.setItem("ptToken", headers.authorization);
            setIsSignModal(prev => ({ ...prev, in: false }));
          },
          onError: error => {
            if (error instanceof AxiosError) {
              const { response } = error;
              alert(response?.data.message);
            }
          },
        },
      );
    } else {
      const _nickRegex = /^[a-zA-Z0-9가-힣]+$/;
      const _isNickValid = _nickRegex.test(userNickname);
      if (!_isNickValid) {
        alert("닉네임이 올바른 형식이 아닙니다.");
        return;
      }

      if (userPw !== confirmPw) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      await signUpSubmit(
        { userId, userPw, userNickname },
        {
          onSuccess: () => {
            alert("정상 처리 되었습니다.");
            setIsSignModal({ up: false, in: true });
          },
          onError: error => {
            if (error instanceof AxiosError) {
              const { response } = error;
              alert(response?.data.message);
            }
          },
        },
      );
    }
  };

  const isUpDisable = Object.values(register).some(_obj => _obj === "");

  const isInDisable = !register.userId || !register.userPw;

  useEffect(() => {
    setRegister({
      userId: "",
      userPw: "",
      userNickname: "",
      confirmPw: "",
    });
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
    <S.SignWrap>
      <S.SignForm onSubmit={onSubmit}>
        <div>
          <S.SignH2>환영합니다!</S.SignH2>
          <S.SignP>회원이 되면 모든 서비스를 이용하실 수 있습니다.</S.SignP>
        </div>
        <S.SignInput
          onChange={onChangeInput("userNickname")}
          placeholder="닉네임 (영문 | 숫자 | 한글 10자리)"
          $signIn={isInOpen}
          value={register.userNickname}
          type="text"
        />
        <S.SignInput
          onChange={onChangeInput("userId")}
          placeholder="아이디 (영문 + 숫자 12자리)"
          value={register.userId}
          type="text"
        />
        <S.SignInput
          onChange={onChangeInput("userPw")}
          placeholder="비밀번호 (영문 + 숫자 12자리)"
          value={register.userPw}
          type="password"
        />
        <S.SignInput
          onChange={onChangeInput("confirmPw")}
          placeholder="비밀번호 확인 (영문 + 숫자 12자리)"
          $signIn={isInOpen}
          value={register.confirmPw}
          type="password"
        />
        <S.SignButton
          $isDisable={isUpOpen ? isUpDisable : isInDisable}
          disabled={isUpOpen ? isUpDisable : isInDisable}
        >
          {isInOpen ? "로그인하기" : "가입하기"}
        </S.SignButton>
        <S.SignButton $reverse={true} type="button" onClick={onClickNotSubBtn}>
          {isInOpen ? "회원가입" : "다음에 할래요"}
        </S.SignButton>
      </S.SignForm>
    </S.SignWrap>
  );
}
