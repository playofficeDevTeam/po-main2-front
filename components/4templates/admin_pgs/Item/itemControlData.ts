const itemExceptionData = ["id"];

export const itemExceptionDataInTable = [...itemExceptionData];

export const itemExceptionDataInCreateForm = [
  ...itemExceptionData,
  "createdAt",
];

export const itemExceptionDataInEditForm = [...itemExceptionData, "createdAt"];

export const itemExceptionDataInEditBtn = [
  ...itemExceptionData,
  "selection",
  "createdAt",
];

export const itemFocusId = "itemCategory1";
