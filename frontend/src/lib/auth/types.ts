export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput extends LoginInput {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
