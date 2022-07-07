import { useRouter } from "next/router";
import { useEffect } from "react";
import hks_getMsPhoto from "./hks_getMsPhoto";

export default function App() {
  const router = useRouter();
  const getMsPhoto = hks_getMsPhoto();
  useEffect(() => {
    getMsPhoto();
    router.push("/admin/dashboard");
  }, []);
  return <></>;
}
