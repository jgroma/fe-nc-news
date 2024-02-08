import { useState } from "react";

export default function ArticleSorter({ setSortingParams, sortingParams }) {
  //const [sortByInput, setSortByInput] = useState();
  //const [orderInput, setOrderInput] = useState();

  function handleSelect(event) {
    //console.dir(event.target.name);
    if (event.target.name === "sort_by") {
      //setSortByInput(event.target.value);
      //console.log(sortByInput);
      setSortingParams((prevParams) => {
        return { ...prevParams, sort_by: event.target.value };
      });
      //console.log(sortingParams);
    } else if (event.target.name === "order") {
      //setOrderInput(event.target.value);
      //console.log(orderInput);
      setSortingParams((prevParams) => {
        return { ...prevParams, order: event.target.value };
      });
      //console.log(sortingParams);
    }
  }
  return (
    <form>
      <label htmlFor="sort_by">Sort by</label>
      <select
        name="sort_by"
        id="sort_by"
        value={sortingParams.sort_by}
        onChange={handleSelect}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
      </select>
      <label htmlFor="order">Order</label>
      <select
        name="order"
        id="order"
        value={sortingParams.order}
        onChange={handleSelect}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </form>
  );
}
