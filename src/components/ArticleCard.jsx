import { Link } from "react-router-dom";
import formatDate from "../utils";

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
}) {
  // function formatDate(date) {
  //   return new Date(date).toDateString();
  // }

  function readArticle() {
    setArticleToRead(article_id);
  }

  return (
    // <li key={article_id}>
    <li className="ArticleCard">
      <p>Title: {title}</p>
      <img src={article_img_url} />
      <p>Topic: {topic}</p>
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
    </li>
  );
}
