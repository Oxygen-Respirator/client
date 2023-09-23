import { Route, Routes } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import Rank from "@/pages/Rank";
import Report from "@/pages/Report";
import PageLayout from "@/components/PageLayout";
import Chat from "@/pages/Chat";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Chat />} />
        <Route path="/" element={<PageLayout />}>
          <Route path="rank" element={<Rank />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
