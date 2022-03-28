import dynamic from "next/dynamic";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.ChannelIO("shutdown");
    return () =>
      window.ChannelIO("boot", {
        pluginKey: "e1c90e36-cc0f-469d-91a9-bbf94a98004c",
      });
  }, []);
  return <></>;
}
