import { isMobile } from "react-device-detect";
import Org_8reference_R_ from "../ExerciseAids/Org_8reference_R_";
import Org_video from "../../../../public/assets/고객반응_유아/Org_video";

export default function App() {
  const data = [
    <Org_video data={{ fileName: "6_1", className: "" }} />,
    <Org_video data={{ fileName: "6_2", className: "" }} />,
    <Org_video data={{ fileName: "6_3", className: "" }} />,
    <Org_video data={{ fileName: "6_4", className: "" }} />,
    <Org_video data={{ fileName: "6_5", className: "" }} />,
  ];

  return <Org_8reference_R_ data={data} />;
}
