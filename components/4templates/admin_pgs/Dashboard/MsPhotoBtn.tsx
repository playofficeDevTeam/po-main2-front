import { useMutation } from "@apollo/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ConsoleView } from "react-device-detect";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { EDIT_ME_FOR_ADMIN } from "../Admin/Gql_admin";
import {
  editMeForAdmin,
  editMeForAdminVariables,
} from "../Admin/__generated__/editMeForAdmin";

export default function App() {
  const [src, setSrc] = useState("");

  const tokenCheck = useTokenCheck();
  const [editMeForAdminMutation, { data: editMeForAdminData }] = useMutation<
    editMeForAdmin,
    editMeForAdminVariables
  >(EDIT_ME_FOR_ADMIN);

  const getPhoto = async () => {
    const socialAccessToken = localStorage.getItem("socialAccessToken");
    axios
      .get<Blob>(`https://graph.microsoft.com/v1.0/me/photos/96x96/$value`, {
        headers: {
          "Content-Type": "image/*",
          Authorization: "Bearer " + socialAccessToken,
        },
        responseType: "blob",
      })
      .then((res) => {
        const myFile = new File([res.data], "imageName");
        const reader = new FileReader();
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result);
          const base64Photo = previewImage.split(",")[1];
          tokenCheck("mutation", () => {
            editMeForAdminMutation({
              variables: {
                input: {
                  profilePicture: base64Photo,
                },
              },
            });
          });
        };
        reader.readAsDataURL(myFile);
      });
  };

  return (
    <>
      <div
        className="m-4 px-2 py-1 border cursor-pointer w-max"
        onClick={() => {
          getPhoto();
        }}
      >
        사진가져오기
      </div>
      <div className="w-40 h-40 overflow-auto">{src}</div>
      <img src={`${src}`} alt="" className=" w-20 h-20" />
    </>
  );
}
