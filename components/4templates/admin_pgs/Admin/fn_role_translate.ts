export default function App(input, reverse = false) {
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
  if (!reverse) {
    return roleList.find((val) => val.raw === input)?.show;
  } else {
    return roleList.find((val) => val.show === input)?.raw;
  }
}
