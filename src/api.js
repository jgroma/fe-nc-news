import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-z5u7.onrender.com/api",
});

export function getArticles(p, sortingParams, topic = "") {
  return ncNewsApi
    .get(`/articles?p=${p}&topic=${topic}`, { params: sortingParams })
    .then((response) => {
      return response.data;
    });
}

export function getArticleById(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data;
  });
}

export function getComments(article_id, p) {
  return ncNewsApi
    .get(`/articles/${article_id}/comments?p=${p}`)
    .then((response) => {
      return response.data;
    });
}

export function patchArticleVote(article_id, vote) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then((response) => {
      return response.data;
    });
}

export function postComment(article_id, username, body) {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((response) => {
      return response.data;
    });
}

export function deleteComment(comment_id) {
  return ncNewsApi.delete(`/comments/${comment_id}`).then((response) => {
    return response.data;
  });
}

export function getTopics() {
  return ncNewsApi.get(`/topics`).then((response) => {
    return response.data;
  });
}
