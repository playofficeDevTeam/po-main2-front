import { isMobile } from "react-device-detect";
import Org_8reference_R_ from "../ExerciseAids/Org_8reference_R_";
import Org_video from "../../../../public/assets/고객반응/고객반응_건강식품/Org_video";

export default function App() {
  const data = [
    <Org_video data={{ fileName: "4_1", className: "" }} />,
    <Org_video data={{ fileName: "4_2", className: "" }} />,
    <Org_video data={{ fileName: "4_3", className: "" }} />,
    <Org_video data={{ fileName: "4_4", className: "" }} />,
    <Org_video data={{ fileName: "4_5", className: "" }} />,
  ];

  return <Org_8reference_R_ data={data} />;
}
