export default ({ items, pagination, volunteerFilter, search, ...rest }) => {
  const { offset, limit, setMax } = pagination;
  let filteredResults = [];
  // Conditional statement to show approved or unapproved
  const conditional =
    volunteerFilter === "approved"
      ? true
      : volunteerFilter === "unapproved"
      ? false
      : null;

  if (volunteerFilter === "filter") {
    filteredResults = items;
  } else {
    filteredResults = items.filter(item => {
      for (let property in item) {
        if (property === "approved") {
          if (item[property] === conditional) {
            return true;
          }
        }
      }
      return false;
    });
  }
  // Filter by search term
  filteredResults = filteredResults.filter(item => {
    for (let property in item) {
      const noSearch = ["user_id", "id"];
      const string = item[property]
        ? item[property].toString().toLowerCase()
        : "";
      const foundNoSearch = noSearch.find(prop => prop === property);
      if (!foundNoSearch && string.includes(search)) {
        return true;
      }
    }
    return false;
  });

  setMax(filteredResults.length);
  return filteredResults.filter(
    (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
  );
};
