import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { refreshTokenVar } from "../../../../common/apollo";
import { useTokenCheck } from "../../../../hooks/useTokenCheck";
import { EDIT_ME_FOR_ADMIN, FIND_ME_FOR_ADMIN } from "../../Admin/Gql_admin";
import {
  editMeForAdmin,
  editMeForAdminVariables,
} from "../../Admin/__generated__/editMeForAdmin";
import { findMeforAdmin } from "../../Admin/__generated__/findMeforAdmin";
export default function App() {
  const router = useRouter();
  const refreshToken = router.query.refreshToken + "";
  const socialRefreshToken = router.query.socialRefreshToken + "";

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

  //뮤테이션
  const [editMeForAdminMutation, { data: editMeForAdminData }] = useMutation<
    editMeForAdmin,
    editMeForAdminVariables
  >(EDIT_ME_FOR_ADMIN, {
    onCompleted: () => {
      refetch();
    },
  });

  const tokenCheck = useTokenCheck();

  useEffect(() => {
    if (router.query.refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("socialRefreshToken", socialRefreshToken);

      refreshTokenVar(refreshToken);

      // 토큰리프레시
      axios
        .post(process.env.NEXT_PUBLIC_API_HOST + "/auth/ms/refresh", {
          socialRefreshToken,
        })
        // 토큰저장
        .then((res) => {
          localStorage.setItem("socialAccessToken", res.data.socialAccessToken);
          localStorage.setItem(
            "socialRefreshToken",
            res.data.socialRefreshToken
          );
          return res.data;
        })
        // 사진 가져오고 저장하기
        .then((res) => {
          axios
            // ms 겟포토
            .get<Blob>(
              `https://graph.microsoft.com/v1.0/me/photos/96x96/$value`,
              {
                headers: {
                  "Content-Type": "image/*",
                  Authorization: "Bearer " + res.socialAccessToken,
                },
                responseType: "blob",
              }
            )
            // 바이너리 > base64
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
        });

      router.push("/admin/dashboard");
    }
  }, [router]);
  return <></>;
}
