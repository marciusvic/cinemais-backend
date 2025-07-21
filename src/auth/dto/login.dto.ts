export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
