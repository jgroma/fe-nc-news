import formatDate from "../utils";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { deleteComment } from "../api";

export default function CommentCard({
  comment_id,
  body,
  author,
  votes,
  created_at,
  setTotalCount,
  setCommentList,
  commentList,
}) {
  const { signedInUser } = useContext(UserContext);

  const [deleteButtonStatus, setDeleteButtonStatus] = useState(false);
  const [deletingError, setDeletingError] = useState(false);

  function handleDelete() {
    setDeleteButtonStatus(true);
    deleteComment(comment_id)
      .then((response) => {
        setDeletingError(false);
        setTotalCount((prevCount) => prevCount - 1);
        setCommentList(
          commentList.filter((comment) => {
            return comment.comment_id !== comment_id;
          })
        );
      })
      .catch((error) => {
        setDeletingError(true);
        setDeleteButtonStatus(false);
      });
  }
  return (
    <li className="ArticleCard">
      <p>Author: {author}</p>
      <p>Date posted: {formatDate(created_at)}</p>
      <p>Votes: {votes}</p>
      <p>{body}</p>
      {author === signedInUser.username ? (
        <button
          className="CommentCard__delete-btn"
          onClick={handleDelete}
          disabled={deleteButtonStatus}
        >
          Delete
        </button>
      ) : null}
      {author === signedInUser.username &&
      deleteButtonStatus &&
      !deletingError ? (
        <p>Comment deletion in progress</p>
      ) : null}
      {author === signedInUser.username && deletingError ? (
        <p>Something went wrong. Comment could not be deleted. Try again</p>
      ) : null}
    </li>
  );
}
