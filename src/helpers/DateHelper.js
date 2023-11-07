export function reformatTime(input) {
    const date = new Date(input); // force LOCAL time,
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    timeZone: 'utc'
  });
}

export function reformatDate(input) {
  const date = new Date(input); // force LOCAL time,
  const options = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleString("id-ID", options);
}