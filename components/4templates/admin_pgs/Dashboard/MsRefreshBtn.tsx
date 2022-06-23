import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";

export default function App() {
  const socialRefreshToken = localStorage.getItem("socialRefreshToken");
  const useMsRefreshMutation = useMutation(() => {
    const data = {
      socialRefreshToken,
    };
    return axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/ms/refresh",
      data
    );
  });
  useEffect(() => {
    const refreshData = useMsRefreshMutation?.data?.data;
    if (refreshData) {
      localStorage.setItem("socialAccessToken", refreshData.socialAccessToken);
      localStorage.setItem(
        "socialRefreshToken",
        refreshData.socialRefreshToken
      );
    }
  }, [useMsRefreshMutation]);
  return (
    <div
      className="m-4 px-2 py-1 border cursor-pointer w-max"
      onClick={() => {
        useMsRefreshMutation.mutate();
      }}
    >
      토큰 리프레쉬 버튼
    </div>
  );
}
