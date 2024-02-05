import { Route, Routes } from "react-router-dom";
import AllArticles from "./AllArticles";

export default function PageManager() {
  return (
    <Routes>
      <Route path="/" element={<AllArticles />}></Route>
    </Routes>
  );
}
