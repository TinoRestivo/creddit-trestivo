export interface UserDataInterface {
  access_token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
