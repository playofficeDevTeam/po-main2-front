import Vdo from "../../../1atoms/Vdo";
import Org_8reference_R_ from "../ExerciseAids/Org_8reference_R_";

export default function App() {
  const data = [
    <Vdo
      key={1}
      src="/assets/고객반응/고객반응_건강식품/4_1"
      className=" mx-auto"
    />,
    <Vdo
      key={2}
      src="/assets/고객반응/고객반응_건강식품/4_2"
      className=" mx-auto"
    />,
    <Vdo
      key={3}
      src="/assets/고객반응/고객반응_건강식품/4_3"
      className=" mx-auto"
    />,
    <Vdo
      key={4}
      src="/assets/고객반응/고객반응_건강식품/4_4"
      className=" mx-auto"
    />,
    <Vdo
      key={5}
      src="/assets/고객반응/고객반응_건강식품/4_5"
      className=" mx-auto"
    />,
  ];

  return <Org_8reference_R_ data={data} />;
}
