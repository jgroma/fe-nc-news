import formatDate from "../utils";

export default function CommentCard({
  comment_id,
  body,
  author,
  votes,
  created_at,
}) {
  return (
    <li className="ArticleCard">
      <p>Author: {author}</p>
      <p>Date posted: {formatDate(created_at)}</p>
      <p>Votes: {votes}</p>
      <p>{body}</p>
    </li>
  );
}
