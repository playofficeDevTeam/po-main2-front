import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
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
          tokenCheck("mutation", async () => {
            await editMeForAdminMutation({
              variables: {
                input: {
                  profilePicture: base64Photo,
                },
              },
            });
            refetch();
          });
        };
        reader.readAsDataURL(myFile);
      });
  };

  return getPhoto;
}
