import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchByTopic from "./SearchByTopic";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import ArticleSorter from "./ArticleSorter";

export default function ArticlesByTopic({ setArticleToRead }) {
  const [articlesList, setArticlesList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [sortingParams, setSortingParams] = useSearchParams();

  const { topic } = useParams();

  useEffect(() => {
    setIsError(null);
    getArticles(currentPage, sortingParams, topic)
      .then((data) => {
        setArticlesList(data.articles);
        setTotalCount(data.total_count);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        let errorMessage = error.response.data.message;
        setIsError(errorMessage);
      });
  }, [currentPage, topic, sortingParams]);

  if (isLoading) return <p>Loading data...</p>;

  if (isError) return <p>{isError}</p>;

  return (
    <main className="AllArticles">
      <SearchByTopic sortingParams={sortingParams} />
      <ArticleSorter
        sortingParams={sortingParams}
        setSortingParams={setSortingParams}
      />
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
