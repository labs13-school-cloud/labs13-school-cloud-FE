export default ({ items, pagination, search }) => {
  const { offset, limit, setMax } = pagination;
  const filteredResults = items.filter(item => {
    for (let property in item) {
      const noSearch = [
        "user_id",
        "manager_id",
        "mentor_id",
        "id",
        "slack_uuid"
      ];
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
