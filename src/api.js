import axios from "axios";

export function getArticles(p) {
  return axios
    .get(`https://nc-news-z5u7.onrender.com/api/articles?p=${p}`)
    .then((response) => {
      //console.log(response, "<<articles arr");
      return response.data;
    });
}
