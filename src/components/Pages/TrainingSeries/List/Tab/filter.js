export default ({ items, pagination, setTrainingFilter }) => {
  const { offset, limit, setMax } = pagination;
  let filteredResults = [];
  const conditional =
  setTrainingFilter === "electronics"
      ? true
      : setTrainingFilter === "clothing"
      ? false
      : null;

  if (setTrainingFilter === "filter") {
    filteredResults = items;
  } else {
    filteredResults = items.filter(item => {
      for (let property in item) {
        if (property === "electronics") {
          if (item[property] === conditional) {
            return true;
          }
        }
      }
      return false;
    });
  }
}