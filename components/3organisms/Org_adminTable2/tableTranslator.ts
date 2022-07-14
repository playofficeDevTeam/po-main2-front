export const tableTranslator = (columns, data) => {
  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  const transList = columns.filter((val) => val.tableType === "translate");
  const newTransObjectArray = transList.map((val) => {
    const dataIndex = dataKeys.indexOf(val.accessor);
    const indexValue = dataValues[dataIndex];
    const transOpion = val.translate || [];
    return {
      [val.accessor]: transOpion.find((val) => val.key === indexValue)?.value,
    };
  });
  const newTransObject = newTransObjectArray.reduce(
    (pre, cur) => ({ ...pre, ...cur }),
    {}
  );

  const booleanList = columns.filter((val) => val.tableType === "boolean");
  const newBooleanObjectArray = booleanList.map((val) => {
    const dataIndex = dataKeys.indexOf(val.accessor);
    const indexValue = dataValues[dataIndex];
    return {
      [val.accessor]: indexValue ? "O" : "X",
    };
  });
  const newBooleanObject = newBooleanObjectArray.reduce((pre, cur) => ({
    ...pre,
    ...cur,
  }));
  return {
    ...data,
    ...newTransObject,
    ...newBooleanObject,
  };
};
// export const tableTranslator = (accessor, columns, input) => {
//   const transOption =
//     columns.find((val) => val.accessor === accessor)?.translate || [];
//   return transOption.find((val) => val.key === input)?.value;
// };
