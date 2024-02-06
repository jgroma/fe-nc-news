import { useEffect, useState } from "react";
import { getArticleById, getComments, patchArticleVote } from "../api";
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
  const [updatedVote, setUpdatedVote] = useState();
  const [userVote, setUserVote] = useState(null);
  const [votingError, setVotingError] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
      setIsArticleLoading(false);
      setTotalCount(data.article.comment_count);
      setUpdatedVote(data.article.votes);
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
      console.log(userVote, "userVote in UseEffect");
      setVotingError(null);
      patchArticleVote(article_id, userVote)
        .then((response) => {
          //console.log(updatedVote, "updatedVote");
          //console.log(response.article.votes, "patch article votes");
        })
        .catch((err) => {
          setVotingError("Something went wrong, please try again.");
          if (userVote === 1) {
            setUpdatedVote((prevVote) => prevVote - 1);
          } else if (userVote === -1) {
            setUpdatedVote((prevVote) => prevVote + 1);
          }
        });
    }
    //}, [userVote]);
  }, [updatedVote]);

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
        comment_count={article.comment_count}
        body={article.body}
        setUpdatedVote={setUpdatedVote}
        setUserVote={setUserVote}
        votingError={votingError}
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
