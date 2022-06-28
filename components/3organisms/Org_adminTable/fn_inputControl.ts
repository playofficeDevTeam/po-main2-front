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
