import { makeVar, useReactiveVar } from "@apollo/client";
import { LoginMutation, useLoginMutation } from "../generated/graphql";

const auth = JSON.parse(localStorage.getItem("login")!) as
  | LoginMutation["login"]
  | null;

export const authVar = makeVar<LoginMutation["login"] | null>(auth);

export const logout = () => {
  localStorage.removeItem("login");
  authVar(null);
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
    const result = await loginMutation({
      variables: { input: { username, password } },
    });

    localStorage.setItem("login", JSON.stringify(result.data?.login));
    setTimeout(() => authVar(result.data?.login), 100);
  };

  return {
    user: auth?.user,
    loading: result.loading,
    error: result.error,
    login,
    logout,
  };
};
