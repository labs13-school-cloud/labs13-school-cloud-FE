const noSearch = [
  "for_manager",
  "for_mentor",
  "series",
  "training_series_id",
  "days_from_start"
];

export default ({ messages, search }) => {
  search = search.toLowerCase();
  return messages
    .filter(message => {
      for (let property in message) {
        const willSearch = !noSearch.find(message[property]);
        if (willSearch && message[property].toLowerCase().includes(search)) {
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
