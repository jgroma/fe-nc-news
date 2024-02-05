import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import ArticleCard from "./ArticleCard";

export default function ArticleById({ article_id }) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      //console.log(data, "art in comp");
      setArticle(data.article);
    });
  }, []);
  return (
    <main>
      <ArticleCard
        article_id={article.article_id}
        title={article.title}
        article_img_url={article.article_img_url}
        topic={article.topic}
        author={article.author}
        created_at={article.created_at}
        votes={article.votes}
        comment_count={article.comment_count}
        body={article.body}
      />
    </main>
  );
}
