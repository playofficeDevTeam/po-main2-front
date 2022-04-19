import dayjs from "dayjs";
import { atom, useRecoilState } from "recoil";

export const rawTableFromDate = atom({
  key: "rawTableFromDate",
  default: dayjs().add(-1, "month"),
});

export const rawTableToDate = atom({
  key: "rawTableToDate",
  default: dayjs(),
});

export const tableFromDate = atom({
  key: "tableFromDate",
  default: dayjs().add(-1, "month"),
});

export const tableToDate = atom({
  key: "tableToDate",
  default: dayjs(),
});
