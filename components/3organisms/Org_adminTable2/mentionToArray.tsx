export default function App(input) {
  const array = input
    .split("@[")
    .filter((val) => val !== "")
    .map((val) => val.split("]")[0]);

  return array;
}
