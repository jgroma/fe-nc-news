export default function ArticleSorter({ setSortingParams, sortingParams }) {
  function handleSelect(event) {
    if (event.target.name === "sort_by") {
      setSortingParams((params) => {
        const prevParams = {};
        params.forEach((value, key) => {
          prevParams[key] = value;
        });
        return { ...prevParams, sort_by: event.target.value };
      });
    } else if (event.target.name === "order") {
      setSortingParams((params) => {
        const prevParams = {};
        params.forEach((value, key) => {
          prevParams[key] = value;
        });
        return { ...prevParams, order: event.target.value };
      });
    }
  }

  return (
    <form className="ArticleSorter__form-container">
      <div>
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
      </div>
      <div>
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
      </div>
    </form>
  );
}
