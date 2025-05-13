export interface iUserCommonDetails {
  name: string;
  email: string;
}
export interface iUserDetails extends iUserCommonDetails {
  id: string;
  createdAt: number;
}
