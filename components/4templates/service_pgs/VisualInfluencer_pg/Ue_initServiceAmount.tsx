import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { serviceDatasAtom } from "./Var_serviceDatas";

export default function App() {
  const [serviceDatasState, setServiceDatasState] =
    useRecoilState(serviceDatasAtom);
  useEffect(() => {
    setServiceDatasState((services) =>
      services.map((service) => ({ ...service, isAmountFix: true }))
    );
    return () => {
      setServiceDatasState((services) =>
        services.map((service) => ({ ...service, isAmountFix: false }))
      );
    };
  }, [setServiceDatasState]);
  return <></>;
}
