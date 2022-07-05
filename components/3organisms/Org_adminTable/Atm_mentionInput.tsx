import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import fn_base64ToSrc from "../../4templates/admin_pgs/Admin/fn_base64ToSrc";
import { FIND_ALL_ADMIN } from "../../4templates/admin_pgs/Admin/Gql_admin";
import { findAllAdmin } from "../../4templates/admin_pgs/Admin/__generated__/findAllAdmin";
import { useTokenCheck } from "../../hooks/useTokenCheck";

const defaultStyle = {
  control: {},

  "&multiLine": {
    control: {
      minHeight: "1.5rem",
    },
    highlighter: {},
    input: {},
  },

  "&singleLine": {
    display: "inline-block",
    width: "24rem",
    highlighter: {},
    input: {},
  },

  suggestions: {
    list: {
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

export default function App({ value, onChange }) {
  //토큰체크
  const tokenCheck = useTokenCheck();
  //쿼리
  const {
    loading: findAllAdminLoading,
    error: findAllAdminError,
    data: findAllAdminData,
    refetch,
  } = useQuery<findAllAdmin>(FIND_ALL_ADMIN);
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findAllAdminData]);

  const users = findAllAdminData?.findAllAdmin?.admins?.map((val) => ({
    id: val.email,
    display: val.nickname,
    image: val.profilePicture,
  }));

  return (
    <MentionsInput
      markup="@[__display__](user:__id__)"
      id="mention"
      value={value}
      onChange={onChange}
      singleLine={false}
      style={defaultStyle}
      placeholder={"'@'를 이용해서 멘션하기"}
      a11ySuggestionsListLabel={"Suggested mentions"}
    >
      <Mention
        trigger="@"
        data={users}
        renderSuggestion={(suggestion, search, highlightedDisplay) => (
          <div className="">
            {suggestion.image && (
              <img
                className="rounded-full w-6 h-6 mr-2"
                src={fn_base64ToSrc(suggestion.image)}
                alt="프로필사진"
              />
            )}
            <div className="">{highlightedDisplay}</div>
          </div>
        )}
        className=" bg-orange-100 rounded-sm text-orange-500 "
      />
    </MentionsInput>
  );
}
