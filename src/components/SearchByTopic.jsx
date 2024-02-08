import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function SearchByTopic() {
  const [selectInput, setSelectInput] = useState();
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopicList(response.topics);
    });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectInput !== undefined) {
      navigate(`/articles/topics/${selectInput}`);
    }
  }, [selectInput]);

  function handleSelectInput(event) {
    setSelectInput(event.target.value);
  }

  return (
    <main>
      <h2>Articles by topic</h2>
      <form>
        <label htmlFor="search-by-topic">Search by topic</label>
        <select
          id="search-by-topic"
          onChange={handleSelectInput}
          value={selectInput}
        >
          {topicList.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </form>
    </main>
  );
}
