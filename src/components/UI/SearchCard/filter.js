export default ({ items, offset, limit, search }) => {
  return items
    .filter(item => {
      for (let property in item) {
        const noSearch = [
          "user_id",
          "manager_name",
          "mentor_name",
          "manager_id",
          "mentor_id",
          "id",
          "slack_uuid"
        ];
        const foundNoSearch = noSearch.find(prop => prop === property);
        if (!foundNoSearch && item[property].toString().includes(search)) {
          return true;
        }
      }
      return false;
    })
    .filter(
      (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
    );
};
