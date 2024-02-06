import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-z5u7.onrender.com/api",
});

export function getArticles(p) {
  return ncNewsApi.get(`/articles?p=${p}`).then((response) => {
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
