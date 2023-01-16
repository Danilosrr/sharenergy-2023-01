import axios from "axios";

export interface SignInData {
  username: string;
  password: string;
}
export interface UsersData {
  dob: object;
  email: string;
  login: { username: string };
  name: { first: string; last: string; title: string };
  picture: object;
}
export interface SearchData {
  filter: "username" | "email" | "name" | "";
  search: string;
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

async function getUsers(resultsTotal: number) {
  const url = `https://randomuser.me/api/?results=${resultsTotal}&seed=abc&inc=name,email,login,picture,dob`;

  return await axios.get(url);
}

export const api = {
  signIn,
  getUsers,
};
