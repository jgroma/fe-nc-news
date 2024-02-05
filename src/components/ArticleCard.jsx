export default function ArticleCard({
  article_id,
  title,
  article_img_url,
  topic,
  author,
  created_at,
  votes,
  comment_count,
}) {
  function formatDate(date) {
    return new Date(date).toDateString();
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
    </li>
  );
}
