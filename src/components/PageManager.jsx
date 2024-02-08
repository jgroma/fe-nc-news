import { Route, Routes } from "react-router-dom";
import AllArticles from "./AllArticles";
import ArticleById from "./ArticleById";
import { useState } from "react";
import SearchByTopic from "./SearchByTopic";
import ArticlesByTopic from "./ArticlesByTopic";
import ErrorPage from "./ErrorPage";
import SignIn from "./SignIn";

export default function PageManager() {
  const [articleToRead, setArticleToRead] = useState();
  const [pathError, setPathError] = useState();

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
      {/* <Route path="/sign-in" element={<SignIn />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
