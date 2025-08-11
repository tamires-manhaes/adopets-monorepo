export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInResponse {
  id: string;
  token: string;
  roles: string[];
}
