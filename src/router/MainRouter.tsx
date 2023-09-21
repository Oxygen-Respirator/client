import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import RootLayout from "../components/RootLayout";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
