export default function datePrettier(inputDate) {
  const date = new Date(inputDate);
  date.setHours(date.getHours() + 9);
  const date_prettier = `${date.getFullYear().toString().substring(2, 4)}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return date_prettier;
}
