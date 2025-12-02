export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}