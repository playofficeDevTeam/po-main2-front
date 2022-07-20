export const tableTranslator = (columns, data) => {
  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  const transList = columns.filter((val) => val.tableType === "translate");
  let newTransObject;
  if (transList) {
    const newTransObjectArray = transList.map((val) => {
      const dataIndex = dataKeys.indexOf(val.accessor);
      const indexValue = dataValues[dataIndex];
      const transOpion = val.translate || [];
      return {
        [val.accessor]: transOpion.find((val) => val.key === indexValue)?.value,
      };
    });
    newTransObject = newTransObjectArray.reduce(
      (pre, cur) => ({ ...pre, ...cur }),
      {}
    );
  }

  const booleanList = columns.filter((val) => val.tableType === "boolean");
  let newBooleanObject;
  if (booleanList) {
    const newBooleanObjectArray = booleanList.map((val) => {
      const dataIndex = dataKeys.indexOf(val.accessor);
      const indexValue = dataValues[dataIndex];
      return {
        [val.accessor]: indexValue ? "O" : "X",
      };
    });
    newBooleanObject = newBooleanObjectArray.reduce(
      (pre, cur) => ({ ...pre, ...cur }),
      {}
    );
  }
  const arrayList = columns.filter((val) => val.tableType === "array");
  let newArrayObject;
  if (arrayList) {
    const newArrayObjectArray = arrayList.map((val) => {
      const dataIndex = dataKeys.indexOf(val.accessor);
      const indexValue: any = dataValues[dataIndex];
      return {
        [val.accessor]: indexValue?.join(", "),
      };
    });
    newArrayObject = newArrayObjectArray.reduce(
      (pre, cur) => ({ ...pre, ...cur }),
      {}
    );
  }
  return {
    ...data,
    ...newTransObject,
    ...newBooleanObject,
    ...newArrayObject,
  };
};
