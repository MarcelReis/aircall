import { makeVar, useReactiveVar } from "@apollo/client";
import { LoginMutation, useLoginMutation } from "../generated/graphql";

const auth = JSON.parse(localStorage.getItem("login")!) as
  | LoginMutation["login"]
  | null;

export const authVar = makeVar<LoginMutation["login"] | null>(auth);

authVar.onNextChange((auth) => {
  localStorage.setItem("login", JSON.stringify(auth));
});

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

    authVar(result.data?.login);
  };

  const logout = () => {
    authVar(null);
  };

  return {
    user: auth?.user,
    loading: result.loading,
    error: result.error,
    login,
    logout,
  };
};
