import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchByTopic from "./SearchByTopic";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

export default function ArticlesByTopic({ setArticleToRead }) {
  const [articlesList, setArticlesList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { topic } = useParams();

  useEffect(() => {
    getArticles(currentPage, topic)
      .then((data) => {
        setArticlesList(data.articles);
        setTotalCount(data.total_count);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, [currentPage, topic]);

  if (isLoading) return <p>Loading data...</p>;

  if (isError) return <p>Something went wrong.</p>;

  return (
    <main className="AllArticles">
      <SearchByTopic></SearchByTopic>
      <h2>List of all {topic} articles</h2>
      <p>Total count: {totalCount}</p>
      <div className="AllArticles__btn-container">
        <button
          onClick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
          disabled={10 * currentPage >= totalCount}
        >
          Next Page
        </button>
      </div>
      <ul className="AllArticles__list">
        {articlesList.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article_id={article.article_id}
              title={article.title}
              article_img_url={article.article_img_url}
              topic={article.topic}
              author={article.author}
              created_at={article.created_at}
              votes={article.votes}
              comment_count={article.comment_count}
              setArticleToRead={setArticleToRead}
            />
          );
        })}
      </ul>
    </main>
  );
}
