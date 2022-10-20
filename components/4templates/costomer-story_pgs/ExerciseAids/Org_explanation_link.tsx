import Link from "next/link";
import Br_mo from "../../../1atoms/Br_mo";
import Br_pc from "../../../1atoms/Br_pc";
import useConversionApi from "../../../hooks/useConversionApi";
import { useGtm } from "../../../hooks/useGtm";
import useIsMobile from "../../../hooks/useIsMobile";
import Org_2explanation_R_ from "./Org_2explanation_R_";

const defaultData = {
  title: <></>,
  content: <></>,
  linkData: {
    title: <></>,
    url: "",
  },
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  const conversionApiMutation = useConversionApi();

  return (
    <>
      <Org_2explanation_R_ data={data} />
      <div className="mb-12"></div>

      {isMobile ? (
        <div className=" text-center underline font-bold text-blue-600 flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <img
              src="/assets/service_Icons/Icon_pushpin.png"
              alt="Icon_pushpin"
            />
          </div>
          <Link href={data.linkData.url}>
            <a
              onClick={() => {
                conversionApiMutation({
                  event_name: "More",
                  custom_data_content_name: "to service page",
                });
              }}
            >
              {data.linkData.title}
            </a>
          </Link>
        </div>
      ) : (
        <div className=" text-center underline font-bold text-blue-600 flex justify-center">
          <div className="flex justify-center mr-2">
            <img
              src="/assets/service_Icons/Icon_pushpin.png"
              alt="Icon_pushpin"
            />
          </div>
          <Link href={data.linkData.url}>
            <a
              onClick={() => {
                conversionApiMutation({
                  event_name: "More",
                  custom_data_content_name: "to service page",
                });
              }}
            >
              {data.linkData.title}
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
