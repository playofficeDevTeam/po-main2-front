export const formFocus = (id) => {
  setTimeout(() => {
    document.getElementById(id)?.focus();
  }, 0);
};

export const columnsMutationType = (type: "create" | "edit", columns) => {
  const valueTypeCheck = (column) => {
    if (type === "create") {
      if (column.value === "") {
        return null;
      } else if (column.mutationType_create === "string") {
        return column.value.trim();
      } else if (column.mutationType_create === "number") {
        return +column.value;
      } else if (column.mutationType_create === "boolean") {
        return column.value === "O" ? true : false;
      } else if (column.mutationType_create === "array") {
        return column.value.split(",").map((val) => val.trim());
      } else if (column.mutationType_create === "translate") {
        const key = column.translate?.find(
          (val2) => val2.value === column.value
        )?.key;
        return key;
      } else {
        return column.value;
      }
    } else if (type === "edit") {
      if (column.value === "") {
        return null;
      } else if (column.mutationType_edit === "string") {
        return column.value.trim();
      } else if (column.mutationType_edit === "number") {
        return +column.value;
      } else if (column.mutationType_edit === "boolean") {
        return column.value === "O" ? true : false;
      } else if (column.mutationType_edit === "array") {
        return column.value.split(",").map((val) => val.trim());
      } else if (column.mutationType_edit === "translate") {
        const key = column.translate?.find(
          (val2) => val2.value === column.value
        )?.key;
        return key;
      } else {
        return column.value;
      }
    }
  };
  let inputData;
  if (type === "create") {
    inputData = columns
      .filter((val) => val.mutationType_create !== "hidden")
      .reduce(
        (pre, cur) => ({
          ...pre,
          [cur.accessor]: valueTypeCheck(cur),
        }),
        {}
      );
  } else if (type === "edit") {
    inputData = columns
      .filter((val) => val.mutationType_edit !== "hidden")
      .reduce(
        (pre, cur) => ({
          ...pre,
          [cur.accessor]: valueTypeCheck(cur),
        }),
        {}
      );
  }
  return inputData;
};
