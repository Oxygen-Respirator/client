import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import RootLayout from "../components/RootLayout";
import Sign from "../pages/Sign";
import SignIn from "../pages/Sign/SignIn";
import SignUp from "../pages/Sign/SignUp";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="signin" element={<Sign />}>
        <Route path="" element={<SignIn />} />
        <Route path="up" element={<SignUp />} />
      </Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
