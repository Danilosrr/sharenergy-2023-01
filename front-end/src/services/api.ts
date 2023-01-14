import axios from "axios";

export interface SignInData {
  username: string;
  password: string;
}
export interface Token {
  token: string;
}

const baseAPI = axios.create({
  baseURL: "http://localhost:4000/",
});

async function signIn(data: SignInData) {
  return await baseAPI.post<Token>("/signin", data);
}

export const api = {
  signIn,
};
