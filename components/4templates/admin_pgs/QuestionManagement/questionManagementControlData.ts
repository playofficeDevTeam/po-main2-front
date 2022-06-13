const questionManagementExceptionData = ["id", "relationId"];

export const questionManagementExceptionDataInTable = [
  ...questionManagementExceptionData,
];

export const questionManagementExceptionDataInCreateForm = [
  ...questionManagementExceptionData,
  "createdAt",
  "brandName",
  "product",
  "serviceInquired",
];

export const questionManagementExceptionDataInEditForm = [
  ...questionManagementExceptionData,
  "createdAt",
  "brandName",
  "product",
  "serviceInquired",
];

export const questionManagementExceptionDataInEditBtn = [
  ...questionManagementExceptionData,
  "selection",
  "createdAt",
  "brandName",
  "product",
  "serviceInquired",
];

export const questionManagementFocusId = "stateName";
