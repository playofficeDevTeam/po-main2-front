import { atom } from "recoil";

const userSwitchingList = [
  {
    culumnName: "total",
    selected: true,
    columns: [
      "createdAt",
      "email",
      "nameId",
      "name",
      "phoneNumber",
      "residentRegistrationNumber",
      "tags",
      "id",
    ],
  },
  {
    culumnName: "instagram",
    selected: false,
    columns: ["email", "name"],
  },
];

export const userSwitchingListData = atom({
  key: "userSwitchingListData",
  default: userSwitchingList,
});
