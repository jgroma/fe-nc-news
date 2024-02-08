import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import ArticleSorter from "./ArticleSorter";

export default function AllArticles({ setArticleToRead }) {
  const [articlesList, setArticlesList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortingParams, setSortingParams] = useState({
    sort_by: "created_at",
    order: "desc",
  });

  useEffect(() => {
    getArticles(currentPage, sortingParams).then((data) => {
      setArticlesList(data.articles);
      setTotalCount(data.total_count);
      setIsLoading(false);
      //console.log(data.articles);
    });
  }, [currentPage, sortingParams]);

  if (isLoading) return <p>Loading data...</p>;

  return (
    <main className="AllArticles">
      <h2>List of all articles</h2>
      <ArticleSorter
        setSortingParams={setSortingParams}
        sortingParams={sortingParams}
      />
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
