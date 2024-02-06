import { Route, Routes } from "react-router-dom";
import AllArticles from "./AllArticles";
import ArticleById from "./ArticleById";
import { useState } from "react";

export default function PageManager() {
  const [articleToRead, setArticleToRead] = useState();
  return (
    <Routes>
      <Route
        path="/"
        element={<AllArticles setArticleToRead={setArticleToRead} />}
      />
      <Route path="/article/:article_id" element={<ArticleById />} />
    </Routes>
  );
}
