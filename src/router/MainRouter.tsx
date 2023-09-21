import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import RootLayout from "../components/RootLayout";
import Sign from "../pages/Sign";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="sign" element={<Sign />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
