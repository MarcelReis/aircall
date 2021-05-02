import { makeVar, useReactiveVar } from "@apollo/client";

export const tokenVar = makeVar<string | null>(null);

export const useAuth = () => {
  const token = useReactiveVar(tokenVar);

  return { token, isLogged: !!token };
};
