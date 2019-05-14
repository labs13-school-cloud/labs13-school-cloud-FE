const noSearch = [
  "for_manager",
  "for_mentor",
  "series",
  "training_series_id",
  "days_from_start"
];

export default ({ ts_id, messages, search }) => {
  search = search.toLowerCase();
  return messages
    .filter(message => message.training_series_id === parseInt(ts_id, 10))
    .filter(message => {
      for (let property in message) {
        const key = message[property].toString().toLowerCase();
        const willSearch = !noSearch.find(str => str === key);
        if (willSearch && key.includes(search)) {
          return true;
        }
      }
      return false;
    })
    .sort((a, b) =>
      a.days_from_start > b.days_from_start
        ? 1
        : b.days_from_start > a.days_from_start
        ? -1
        : 0
    );
};

// Sample message
// {
//     subject,
//     body,
//     link,
//     for_manager,
//     for_mentor,
//     series,
//     training_series_id,
//     days_from_start
// }
