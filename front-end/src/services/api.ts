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
export interface ClientData {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
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

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signIn(data: SignInData) {
  return await baseAPI.post<Token>("/signin", data);
}

async function getUsers(resultsTotal: number) {
  const url = `https://randomuser.me/api/?results=${resultsTotal}&seed=abc&inc=name,email,login,picture,dob`;

  return await axios.get(url);
}

async function getClients(token: string) {
  const config = getConfig(token);
  return await baseAPI.get("/client", config);
}

async function deleteClients(data: { id: string }, token: string) {
  const config = getConfig(token);
  return await baseAPI.delete("/client", {
    data: data,
    headers: config.headers,
  });
}

async function updateClient(data: ClientData, token: string) {
  const config = getConfig(token);
  return await baseAPI.put("/client", data, config);
}

async function postClient(data: Omit<ClientData, "id">, token: string) {
  const config = getConfig(token);
  return await baseAPI.post("/client", data, config);
}

async function getDogImage() {
  const url = "https://random.dog/woof?filter=mp4,webm";
  const src = (await axios.get(url)).data;
  return "https://random.dog/" + src;
}

export const api = {
  signIn,
  getUsers,
  getDogImage,
  getClients,
  deleteClients,
  updateClient,
  postClient,
};
