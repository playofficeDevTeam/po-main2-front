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

export const columnsMutationType = (columns, exceptionData) => {
  const valueTypeCheck = (column) => {
    if (column.value === "") {
      return null;
    } else if (column.mutationType === "string") {
      return column.value.trim();
    } else if (column.mutationType === "number") {
      return +column.value;
    } else if (column.mutationType === "boolean") {
      return Boolean(column.value);
    } else if (column.mutationType === "array") {
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
