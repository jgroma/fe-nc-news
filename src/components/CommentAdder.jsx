import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { postComment } from "../api";

export default function CommentAdder({
  article_id,
  setCommentList,
  commentList,
  setTotalCount,
}) {
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postingError, setPostingError] = useState(null);
  const [postButtonStatus, setPostButtonStatus] = useState(false);

  const { signedInUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(signedInUser).length === 0) {
      setPostButtonStatus(true);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    postComment(article_id, signedInUser.username, commentInput)
      .then((response) => {
        setIsLoading(false);
        setPostingError(null);
        setCommentList([response.comment, ...commentList]);
        setTotalCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        setIsLoading(false);
        setPostingError("Couldn't post comment. Try again.");
      });
  }
  function handleCommentInput(event) {
    setCommentInput(event.target.value);
  }

  if (isLoading) return <p>Comment is being created</p>;
  return (
    <>
      {postButtonStatus ? <p>Sign in to post comments</p> : null}
      {postingError !== null ? <p>{postingError}</p> : null}
      <form onSubmit={handleSubmit}>
        <div className="CommentAdder__form-container">
          <label htmlFor="comment_body">Add comment</label>
          <textarea
            name="comment_body"
            id="comment_body"
            onChange={handleCommentInput}
            rows="6"
            cols="40"
            required
          />
          <button disabled={postButtonStatus}>Submit</button>
        </div>
      </form>
    </>
  );
}
