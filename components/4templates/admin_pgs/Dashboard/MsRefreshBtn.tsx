import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";

export default function App() {
  const client_id = "312da941-84c4-47c5-867b-6ff3d7d9df87";
  const grant_type = "refresh_token";
  const scope = "user.read";
  const refresh_token =
    "0.AT4A4A9HTrgPv0qDnVae_w8i_kGpLTHEhMVHhntv89fZ34c-ADM.AgABAAEAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P9MrnU1A5vKZqDJeDPUwPczjh4mtz7VwhYpXR3v0EkDpWvQZDJridEDsbY9MYRHOIlg0y1-14y1rJUDwNdLJut0xz0RUMlerLCoWyCtl_pwJsLfr18j93izg6zmCwN2l_kJDkNK4SfPAIBJRucV26BcaJGsHE3RJuYIb_hm0dAINTcNkW6wrUH1wGVbM7JXfqPjAHAWU56oM_oPReVA8yBxNzi2VlOsA4y2S1NP9vBlwFb4bDeTjT3EQiKEFgRa_HfD0rRifMEtGBElopWH8Qsa_4AB-ZUuHnpVJXgDPUj46t85mCgYMdsBYEMOHyIn5d4h8PP0Tq2rez8_BB0z_taxmAyC3uKBEEPB3PczJtc8-3I6rELKlWES9FAfyjs8xTTV5GM558Raev17ra3wVNZMc_fYrl38yu6LMhq8XaIj2dYZWUtOTobzHxa_hdbVImy9rV6nPSIbzSWk7X54F1wDADDZL7EfFQfAJ_68EWoldquyp7doBxNwQZ12Gb5riNz3F2-ZsBCAZxj87jRGdHH5-ddSS0ojShv5MrNX12Y316oFhg6fzT5Gcb77hoIKdS1PCFcPK7HrBscsEsfZvsR4wd8AXYDjonU02WkTM1Wm-Y-JedOFOeI10O-XMk3UFbvBeOkUcj9Y1tVfJu2tePt-DIC9hiMW50rO0sJVZDJEA7dTfCFWn3Nq-iuHbCEw_ei4LuQLTAZlrfYRWD9MvRbrsD8COb-EkepQCbsCyKM5EjffGez_C18CgssPQwpz5JtG2AhWs1A-X6U";
  const redirect_uri =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
  const client_secret = "o838Q~l4~XDoSdouEU9E3Wjl5gy-raHfxbdVecJQ";

  const useMsRefreshMutation = useMutation(() => {
    return axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token HTTP/1.1",
      `client_id=${client_id}&scope=${scope}&refresh_token=${refresh_token}&redirect_uri=${redirect_uri}&grant_type=${grant_type}&client_secret=${client_secret}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  });
  useEffect(() => {
    console.log(useMsRefreshMutation.data);
  }, [useMsRefreshMutation]);
  return (
    <div
      className="m-4 px-2 py-1 border cursor-pointer w-max"
      onClick={() => {
        useMsRefreshMutation.mutate();
      }}
    >
      테스트버튼
    </div>
  );
}
