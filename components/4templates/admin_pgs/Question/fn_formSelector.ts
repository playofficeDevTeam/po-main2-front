export function formSelector(accessor: string, form: Array<any>) {
  const findOne = form.find((e) => e.accessor === accessor);
  const outputValue: string = findOne.value + "";
  return outputValue;
}
