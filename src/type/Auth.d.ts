interface Sign extends SignUp {
  confirmPw: string;
}

interface SignUp extends SignIn {
  userNickname: string;
}

interface SignIn {
  userId: string;
  userPw: string;
}

interface IsSignModal {
  in: boolean;
  up: boolean;
}
