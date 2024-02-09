import { useEffect, useState } from "react";
import { getArticleById, getComments, patchArticleVote } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";

export default function ArticleById() {
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentListLoading, setIsCommentListLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [updatedVote, setUpdatedVote] = useState();
  const [userVote, setUserVote] = useState(null);
  const [votingError, setVotingError] = useState(null);

  const [errorArticleId, setErrorArticleId] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setErrorArticleId(null);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setIsArticleLoading(false);
        setTotalCount(data.article.comment_count);
        setUpdatedVote(data.article.votes);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          errorMessage = "Article id must be a numeric value.";
        } else {
          errorMessage = "Article does not exist";
        }
        setErrorArticleId(errorMessage);
      });
  }, []);

  useEffect(() => {
    getComments(article_id, currentPage).then((data) => {
      setCommentList(data.comments);
      setIsCommentListLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    if (userVote !== null) {
      setVotingError(null);
      patchArticleVote(article_id, userVote)
        .then((response) => {})
        .catch((err) => {
          setVotingError("Something went wrong, please try again.");
          if (userVote === 1) {
            setUpdatedVote((prevVote) => prevVote - 1);
          } else if (userVote === -1) {
            setUpdatedVote((prevVote) => prevVote + 1);
          }
        });
    }
  }, [updatedVote]);

  if (errorArticleId) return <p>{errorArticleId}</p>;
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
        votes={updatedVote}
        comment_count={totalCount}
        body={article.body}
        setUpdatedVote={setUpdatedVote}
        setUserVote={setUserVote}
        votingError={votingError}
      />
      <h2>Comments</h2>
      <CommentAdder
        article_id={article_id}
        setCommentList={setCommentList}
        commentList={commentList}
        setTotalCount={setTotalCount}
      />
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
                setTotalCount={setTotalCount}
                setCommentList={setCommentList}
                commentList={commentList}
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
