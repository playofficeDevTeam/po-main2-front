import dayjs from "dayjs";

export function datePrettier(inputDate) {
  const date = dayjs(inputDate);
  const stringDate = date.format("YY-MM-DD HH:mm:ss");
  return stringDate;
}
