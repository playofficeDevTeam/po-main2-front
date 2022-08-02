import { useMutation } from "@apollo/client";
import { atom, useRecoilState } from "recoil";
import {
  accessTokenVar,
  refreshTokenVar,
  userLoggedInVar,
} from "../../../common/apollo";
import { LOGIN_USER } from "./gql_loginUser";
import { loginUser, loginUserVariables } from "./__generated__/loginUser";

const userLoginDefault = [
  {
    Header: "이메일",
    accessor: "email",
    value: "",
    formType: "text",
    mutaionType: "string",
  },
  {
    Header: "비밀번호",
    accessor: "password",
    value: "",
    formType: "password",
    mutaionType: "string",
  },
];

const userLoginAtom = atom({
  key: "userLoginAtom",
  default: userLoginDefault,
});

function App() {
  const [userLoginState, setUserLoginState] = useRecoilState(userLoginAtom);
  const onChange = (e, id) => {
    setUserLoginState((userLolginState) =>
      userLolginState.map((val, idx) =>
        idx === id ? { ...val, value: e.target.value } : val
      )
    );
  };

  const loginMutation = useMutation<loginUser, loginUserVariables>(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      localStorage.setItem("accessToken", data.loginUser.accessToken + "");
      localStorage.setItem("refreshToken", data.loginUser.refreshToken + "");

      accessTokenVar(data.loginUser.accessToken + "");
      refreshTokenVar(data.loginUser.refreshToken + "");
      userLoggedInVar(true);
    },
  });

  const onSubmit_login = async () => {
    const mutated = await loginMutation[0]({
      variables: {
        input: {
          email: userLoginState.find((val) => val.accessor === "email")?.value,
          password: userLoginState.find((val) => val.accessor === "password")
            ?.value,
        },
      },
    });
  };
  return (
    <>
      <div className="">
        <form
          onSubmit={(e) => {
            onSubmit_login();
            e.preventDefault();
          }}
        >
          <ul>
            {userLoginState.map((val, idx) => (
              <li>
                <input
                  type={val.formType}
                  className="border w-96 p-1 m-1"
                  value={val.value}
                  onChange={(e) => {
                    onChange(e, idx);
                  }}
                />
              </li>
            ))}
            <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
              확인
            </button>
          </ul>
        </form>
      </div>
    </>
  );
}
export default App;
