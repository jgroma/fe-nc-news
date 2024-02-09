import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function SearchByTopic({}) {
  const [selectInput, setSelectInput] = useState();
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsError(null);
    getTopics()
      .then((response) => {
        setTopicList(response.topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError("Something went wrong.");
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectInput === "/") {
      navigate(`/`);
    } else if (selectInput !== undefined && selectInput !== "") {
      navigate(`/articles/topics/${selectInput}`);
    }
  }, [selectInput]);

  function handleSelectInput(event) {
    setSelectInput(event.target.value);
  }

  if (isLoading) return <p>Loading data...</p>;

  if (isError) return <p>{isError}</p>;

  return (
    <main>
      <form>
        <label htmlFor="search-by-topic">Search by topic</label>
        <select
          id="search-by-topic"
          onChange={handleSelectInput}
          value={selectInput}
        >
          <option value="">--Choose topic--</option>
          <option value="/">All articles</option>
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
