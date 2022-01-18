export type AuthenticationType = {
  email: string;
  password: string;
};

export interface IAuthentication {
  auth(authentication: AuthenticationType): Promise<string>;
}
