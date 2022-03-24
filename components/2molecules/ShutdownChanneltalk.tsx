import { useEffect } from "react";
import ChannelService from "/home/app/components/common/ChannelService";

export default function App() {
  useEffect(() => {
    ChannelService.shutdown();
    return () =>
      ChannelService.boot({
        pluginKey: "e1c90e36-cc0f-469d-91a9-bbf94a98004c",
      });
  }, []);
  return <></>;
}
