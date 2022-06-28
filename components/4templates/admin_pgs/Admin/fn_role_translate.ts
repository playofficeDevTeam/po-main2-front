export default function App(input) {
  const roleList = [
    {
      raw: "Super",
      show: "슈퍼",
    },
    {
      raw: "General",
      show: "일반",
    },
  ];
  return roleList.find((val) => val.raw === input)?.show;
}
