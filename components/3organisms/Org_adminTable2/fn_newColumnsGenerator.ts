export const fn_newColumnsGenerator = (columnsDefault, newColumnsArray) => {
  let newUserColumns: any = [];
  newColumnsArray.forEach((val) => {
    const columnIndex = columnsDefault.findIndex(
      (val2) => val2.accessor === val
    );
    if (columnIndex !== -1) {
      newUserColumns.push(columnsDefault[columnIndex]);
    }
  });
  return newUserColumns;
};
