import { makeVar, useReactiveVar } from "@apollo/client";
import {
  AuthResponseType,
  LoginMutation,
  RefreshTokenMutation,
  useLoginMutation,
} from "../generated/graphql";

const auth = JSON.parse(localStorage.getItem("login")!) as
  | LoginMutation["login"]
  | RefreshTokenMutation["refreshToken"]
  | null;

export const authVar = makeVar<LoginMutation["login"] | null>(auth);

export const logout = () => {
  localStorage.removeItem("login");
  authVar(null);
};

export const setLogin = (login: AuthResponseType) => {
  localStorage.setItem("login", JSON.stringify(login));
  authVar(login);
};

export const useAuth = () => {
  const [loginMutation, result] = useLoginMutation();
  const auth = useReactiveVar(authVar);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data } = await loginMutation({
      variables: { input: { username, password } },
    });

    setLogin(data?.login!);
  };

  return {
    token: auth?.access_token,
    user: auth?.user,
    loading: result.loading,
    error: result.error,
    login,
    logout,
  };
};
