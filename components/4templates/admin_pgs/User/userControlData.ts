const userExceptionData = ["id"];

export const userExceptionDataInTable = [
  ...userExceptionData,
  "password",
  "passwordCheck",
];

export const userExceptionDataInCreateForm = [
  ...userExceptionData,
  "createdAt",
];

export const userExceptionDataInEditForm = [...userExceptionData, "createdAt"];

export const userExceptionDataInEditBtn = [
  ...userExceptionData,
  "selection",
  "createdAt",
];

export const userFocusId = "email";
