export default ({ items, offset, limit, filters, member_id }) => {
  let sorted = items.sort((a, b) =>
    a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
  );

  if (member_id) {
    sorted = sorted.filter(
      ({ team_member_id: id }) => id === parseInt(member_id, 10)
    );
  }

  return sorted
    .filter(({ name, is_sent }) => {
      if (
        (filters.status === "pending" && !is_sent) ||
        (filters.status === "sent" && is_sent)
      ) {
        return filters.service === "all" ? true : name === filters.service;
      } else return false;
    })
    .filter(
      (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
    );
};
