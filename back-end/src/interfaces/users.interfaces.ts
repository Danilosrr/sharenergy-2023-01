export interface User {
  username: string;
  password: string;
}

export interface Token {
  id: string;
  username: string;
  exp: number;
  iat: number;
}
