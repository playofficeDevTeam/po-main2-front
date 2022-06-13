import dayjs from "dayjs";

export function dateSmall(inputDate) {
  const date = dayjs(inputDate);
  const stringDate = date.format("YYYY-MM-DD");
  return stringDate;
}
