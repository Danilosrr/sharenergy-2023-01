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

async function getUsers(page: number) {
  const pageSize = 10;
  const url = `https://randomuser.me/api/?page=${page}&results=${pageSize}&seed=abc`;

  return await axios.get(url);
}

export const api = {
  signIn,
  getUsers,
};
