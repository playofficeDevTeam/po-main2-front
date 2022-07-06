import dayjs from "dayjs";

export function dateTime(inputDate) {
  const date = dayjs(inputDate);
  const stringDate = date.format("YY-MM-DD A hh:mm");
  return stringDate;
}
