// ! FUNCTION MUST BE CLEANED UP AND DRY EVENTUALLY

export default ({ items, pagination, volunteerFilter, search, ...rest }) => {
  const { offset, limit, setMax } = pagination;
  let filteredResults = [];

  if (volunteerFilter === "filter") {
    filteredResults = items;
  }

  if (volunteerFilter === "approved" || volunteerFilter === "unapproved") {
    if (volunteerFilter === "unapproved") {
      const unapproved = items.filter(item => {
        for (let property in item) {
          if (property === "approved") {
            if (item[property] === false) {
              return true;
            }
          }
        }
        return false;
      });
      filteredResults = unapproved;
    } else {
      const approved = items.filter(item => {
        for (let property in item) {
          if (property === "approved") {
            if (item[property] === true) {
              return true;
            }
          }
        }
        return false;
      });
      filteredResults = approved;
    }
  }
  
  filteredResults = filteredResults.filter(item => {
    for (let property in item) {
      const noSearch = [
        "user_id",
        "id"
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
