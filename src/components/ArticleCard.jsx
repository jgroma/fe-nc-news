import { Link } from "react-router-dom";
import formatDate from "../utils";
import { useState } from "react";

export default function ArticleCard({
  article_id,
  title,
  article_img_url,
  topic,
  author,
  created_at,
  votes,
  comment_count,
  setArticleToRead,
  body,
  setUpdatedVote,
  setUserVote,
  votingError,
}) {
  const [hasVoted, setHasVoted] = useState(false);
  const [upvoteButtonStatus, setUpvoteButtonSatus] = useState(false);
  const [downvoteButtonStatus, setDownvoteButtonStatus] = useState(false);

  function readArticle() {
    setArticleToRead(article_id);
  }

  function handleUpvote() {
    if (!hasVoted) {
      setUpdatedVote((prevVote) => prevVote + 1);
      setHasVoted(true);
      setDownvoteButtonStatus(true);
      setUserVote(1);
      //console.log("upovoted +1");
    } else {
      //undo upvote
      setUpdatedVote((prevVote) => prevVote - 1);
      setHasVoted(false);
      setDownvoteButtonStatus(false);
      setUserVote(-1);
      //console.log("cancelled upvote -1");
    }
  }

  function handleDownvote() {
    if (!hasVoted) {
      setUpdatedVote((prevVote) => prevVote - 1);
      setHasVoted(true);
      setUpvoteButtonSatus(true);
      setUserVote(-1);
      //console.log("downvoted -1");
    } else {
      //undo downvote
      setUpdatedVote((prevVote) => prevVote + 1);
      setHasVoted(false);
      setUpvoteButtonSatus(false);
      setUserVote(1);
      //console.log("cancelled downvote +1");
    }
  }

  return (
    <li className="ArticleCard">
      <p>Title: {title}</p>
      <img src={article_img_url} />
      <Link to={`/articles/topics/${topic}`}>
        <p>Topic: {topic}</p>
      </Link>
      <p>Author: {author}</p>
      <p>Date posted: {formatDate(created_at)}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      {setArticleToRead !== undefined ? (
        <Link to={`/article/${article_id}`} onClick={readArticle}>
          Read
        </Link>
      ) : null}
      {body !== undefined ? <p>{body}</p> : null}
      {setUpdatedVote !== undefined ? (
        <div className="ArticleCard__btn-container">
          <button onClick={handleUpvote} disabled={upvoteButtonStatus}>
            {downvoteButtonStatus ? "Cancel upvote" : "Upvote"}
          </button>
          <button onClick={handleDownvote} disabled={downvoteButtonStatus}>
            {upvoteButtonStatus ? "Cancel downvote" : "Downvote"}
          </button>
        </div>
      ) : null}
      {votingError ? <p>{votingError}</p> : null}
    </li>
  );
}
