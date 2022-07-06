export default function App(input) {
  const array = input
    .split("@[")
    .filter((val) => ![""].includes(val))
    .map((val) => val.trim().split("]")[0]);

  return array;
}
