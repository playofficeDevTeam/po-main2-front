export const formFocus = (id) => {
  setTimeout(() => {
    document.getElementById(id)?.focus();
  }, 0);
};

export const formDataSelect = (columnState, name) => {
  const selectedValue = columnState.find((val) => val.accessor === name).value;

  if (selectedValue === "") {
    return null;
  } else if (selectedValue === "참") {
    return true;
  } else if (selectedValue === "거짓") {
    return false;
  } else {
    return selectedValue;
  }
};

export const columnsInput = (columns, exceptionData) => {
  const valueTypeCheck = (column) => {
    if (column.value === "") {
      return null;
    } else if (column.inputType === "string") {
      return column.value;
    } else if (column.inputType === "number") {
      return +column.value;
    } else if (column.inputType === "boolean") {
      return Boolean(column.value);
    } else if (column.inputType === "won") {
      return +column.value;
    } else if (column.inputType === "array") {
      return column.value.split(",").map((val) => val.trim());
    }
  };
  const inputData = columns
    .filter((val) => !exceptionData.includes(val.accessor))
    .reduce(
      (pre, cur) => ({
        ...pre,
        [cur.accessor]: valueTypeCheck(cur),
      }),
      {}
    );
  return inputData;
};
