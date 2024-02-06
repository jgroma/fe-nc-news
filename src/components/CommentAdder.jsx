import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { postComment } from "../api";

export default function CommentAdder({
  article_id,
  setCommentList,
  commentList,
}) {
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //update commentListState
  //context provider userName
  const { signedInUser } = useContext(UserContext);
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    postComment(article_id, signedInUser, commentInput).then((response) => {
      setIsLoading(false);
      console.log(`Comment posted by ${signedInUser}. Body - ${commentInput}`);
      setCommentList([response.comment, ...commentList]);
    });
  }
  function handleCommentInput(event) {
    setCommentInput(event.target.value);
  }

  if (isLoading) return <p>Comment is being created</p>;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment_body">Add comment</label>
      <textarea
        name="comment_body"
        id="comment_body"
        onChange={handleCommentInput}
        required
      />
      <button>Submit</button>
    </form>
  );
}
