const timeConverter = (date) => {
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  );
  let result = new Date(now_utc);

  return result;
};
export default timeConverter;
