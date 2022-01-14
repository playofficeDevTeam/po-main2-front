import Vdo from "../../../1atoms/Vdo";
import Org_8reference_R_ from "../ExerciseAids/Org_8reference_R_";

export default function App() {
  const data = [
    <Vdo src="/assets/고객반응/고객반응_유아/6_1" className=" mx-auto" />,
    <Vdo src="/assets/고객반응/고객반응_유아/6_2" className=" mx-auto" />,
    <Vdo src="/assets/고객반응/고객반응_유아/6_3" className=" mx-auto" />,
    <Vdo src="/assets/고객반응/고객반응_유아/6_4" className=" mx-auto" />,
    <Vdo src="/assets/고객반응/고객반응_유아/6_5" className=" mx-auto" />,
  ];

  return <Org_8reference_R_ data={data} />;
}
