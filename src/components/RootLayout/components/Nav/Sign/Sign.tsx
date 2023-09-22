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

  const [register, setRegister] = useState<Sign>({
    userId: "",
    userPw: "",
    userNickname: "",
    confirmPw: "",
  });

  const [errorMsg,setErrorMsg] = useState("")

  const { mutateAsync: signUpSubmit } = useSignUpMutation();
  const { mutateAsync: signInSubmit } = useSignInMutation();

  const onChangeInput =( name: keyof Sign)=>({
    target: { value },
  }: {
    target: { value: string };
  }) =>{
    if(value===""){
      setRegister(prev => ({ ...prev, [name]: value }));
      return ;
    }
    if(name==='userNickname'&&register[name].length>7){
      return;
    }
    if(register[name].length>11){
      return;
    }    
    const regex = /^[a-zA-Z0-9]+$/;
    const isValid = regex.test(value);

    if(isValid){ 
      setRegister(prev => ({ ...prev, [name]: value }));
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId, userPw, confirmPw, userNickname } = register;
    if (isInOpen) {
      const response = await signInSubmit({ userId, userPw });
      const {status} =response;
      if(status===200){
        const {headers} = response;
        localStorage.setItem('ptToken',headers.authorization)
        setIsSignModal(prev=>({...prev,in:false}))
      }
    } else {
      const { userPw } = register;
      if (userPw !== confirmPw) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
      const result = await signUpSubmit({ userId, userPw, userNickname });

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
    <SignWrap>
      <SignForm onSubmit={onSubmit}>
        <div>
          <SignH2>환영합니다!</SignH2>
          <SignP>회원이 되면 모든 서비스를 이용하실 수 있습니다.</SignP>
        </div>
        <SignInput
          onChange={onChangeInput('userNickname')}
          placeholder="닉네임 (영문 + 숫자 10자리)"
          $signIn={isInOpen}
          value={register.userNickname}
          type="text"
        />
        <SignInput
          onChange={onChangeInput('userId')}
          placeholder="아이디 (영문 + 숫자 12자리)"
          value={register.userId}
          type="text"
        />
        <SignInput
          onChange={onChangeInput('userPw')}
          placeholder="비밀번호 (영문 + 숫자 12자리)"
          value={register.userPw}
          type="password"
        />
        <SignInput
          onChange={onChangeInput('confirmPw')}
          placeholder="비밀번호 확인 (영문 + 숫자 12자리)"
          $signIn={isInOpen}
          value={register.confirmPw}
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
