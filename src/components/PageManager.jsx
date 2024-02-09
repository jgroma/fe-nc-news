import { Route, Routes } from "react-router-dom";
import AllArticles from "./AllArticles";
import ArticleById from "./ArticleById";
import { useState } from "react";
import SearchByTopic from "./SearchByTopic";
import ArticlesByTopic from "./ArticlesByTopic";
import ErrorPage from "./ErrorPage";

export default function PageManager() {
  const [articleToRead, setArticleToRead] = useState();

  return (
    <Routes>
      <Route
        path="/"
        element={<AllArticles setArticleToRead={setArticleToRead} />}
      />
      <Route path="/article/:article_id" element={<ArticleById />} />
      <Route path="/articles/topics" element={<SearchByTopic />} />
      <Route
        path="/articles/topics/:topic"
        element={<ArticlesByTopic setArticleToRead={setArticleToRead} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
