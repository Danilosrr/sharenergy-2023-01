export interface Client {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
}

export interface ClientId extends Client {
  id: string;
}
