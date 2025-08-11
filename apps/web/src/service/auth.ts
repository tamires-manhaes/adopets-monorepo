import type { SignInInput, SignInResponse } from "../@types/auth";
import cookies from "../lib/cookies";
import { api } from "./api";

export const signIn = async (data: SignInInput) => {
  return await api
    .post("/auth/login", { json: { ...data } })
    .json<SignInResponse>();
};

export const signOut = async () => {
  cookies.remove("token");
};
