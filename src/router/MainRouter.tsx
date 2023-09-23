import { Route, Routes } from "react-router-dom";
import Main from "@/pages/Main";
import RootLayout from "@/components/RootLayout";
import Rank from "@/pages/Main/Rank";
import Report from "@/pages/Main/Report";
import PageLayout from "@/components/PageLayout";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="/" element={<PageLayout />}>
          <Route path="rank" element={<Rank />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
