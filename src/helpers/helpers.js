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

// const timeConverter = (date) => {
//   let now_utc = date.toISOString(
//    '-' + date.getFullYear() +
//    '-' + date.getMonth() +
//    'T' + date.getDate() +
//    ':' + date.getHours() +
//     date.getMinutes()
//   );
//   let result = new Date(now_utc);

//   return result;
// };
