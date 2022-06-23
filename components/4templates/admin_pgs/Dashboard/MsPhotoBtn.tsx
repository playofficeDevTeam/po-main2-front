import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function App() {
  const useGetMsPhotoMutation = useMutation(() => {
    const socialAccessToken = localStorage.getItem("socialAccessToken");
    const photoResOptions = {
      headers: {
        "Content-Type": "image/jpg",
        Authorization: "Bearer " + socialAccessToken,
      },
    };
    return axios.get(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      photoResOptions
    );
  });

  const photoRes = useGetMsPhotoMutation?.data?.data;
  useEffect(() => {
    if (photoRes) {
      console.log(photoRes);
    }
  }, [useGetMsPhotoMutation]);

  return (
    <>
      <div
        className="m-4 px-2 py-1 border cursor-pointer w-max"
        onClick={() => {
          useGetMsPhotoMutation.mutate();
        }}
      >
        사진가져오기
      </div>
    </>
  );
}
