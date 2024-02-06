import { useEffect, useState } from "react";
import { getArticleById, getComments } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

export default function ArticleById() {
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentListLoading, setIsCommentListLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
      setIsArticleLoading(false);
      setTotalCount(data.article.comment_count);
    });
  }, []);

  useEffect(() => {
    getComments(article_id, currentPage).then((data) => {
      setCommentList(data.comments);
      setIsCommentListLoading(false);
    });
  }, [currentPage]);

  if (isArticleLoading) return <p>Loading article...</p>;
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
      <h2>Comments</h2>
      {totalCount > 10 ? (
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
      ) : null}
      {isCommentListLoading === false ? (
        <ul className="CommentList">
          {commentList.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment_id={comment.comment_id}
                body={comment.body}
                author={comment.author}
                votes={comment.votes}
                created_at={comment.created_at}
              />
            );
          })}
        </ul>
      ) : (
        <p>Comments are loading...</p>
      )}
    </main>
  );
}
