export const tableTranslator = (accessor, columns, input) => {
  const transOption =
    columns.find((val) => val.accessor === accessor)?.translate || [];
  return transOption.find((val) => val.key === input)?.value;
};
