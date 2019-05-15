export default ({ items, pagination, filters, member_id }) => {
  const { offset, limit, setMax } = pagination;
  let filtered = items;
  if (member_id) {
    filtered = filtered.filter(
      ({ team_member_id: id }) => id === parseInt(member_id, 10)
    );
  }

  filtered = filtered.filter(({ name, is_sent }) => {
    if (
      (filters.status === "pending" && !is_sent) ||
      (filters.status === "sent" && is_sent)
    ) {
      return filters.service === "all" ? true : name === filters.service;
    } else return false;
  });

  filtered.sort((a, b) =>
    a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
  );
  setMax(filtered.length);
  return filtered.filter(
    (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
  );
};
