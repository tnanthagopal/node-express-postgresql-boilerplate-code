import { iUserDetails } from "../models/userModel";

export interface iLoginReqDTO {
  email: string;
  password: string;
}
export interface iLoginResDTO {
  user: iUserDetails;
  accessToken: string;
  expirationTimeStamp: number;
  refreshToken: string;
}
