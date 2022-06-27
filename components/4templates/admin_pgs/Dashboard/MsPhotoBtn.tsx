import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import fn_base64ToSrc from "../Admin/fn_base64ToSrc";
import { EDIT_ME_FOR_ADMIN, FIND_ME_FOR_ADMIN } from "../Admin/Gql_admin";
import {
  editMeForAdmin,
  editMeForAdminVariables,
} from "../Admin/__generated__/editMeForAdmin";
import { findMeforAdmin } from "../Admin/__generated__/findMeforAdmin";

export default function App() {
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findMeforAdminLoading,
    error: findMeforAdminError,
    data: findMeforAdminData,
    refetch,
  } = useQuery<findMeforAdmin>(FIND_ME_FOR_ADMIN);
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findMeforAdminData]);

  const myPhoto = findMeforAdminData?.findMeforAdmin.admin?.profilePicture;

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
      <div className="w-40 h-40 overflow-auto">{myPhoto}</div>
      <img src={`${fn_base64ToSrc(myPhoto)}`} alt="" className=" w-20 h-20" />
    </>
  );
}
