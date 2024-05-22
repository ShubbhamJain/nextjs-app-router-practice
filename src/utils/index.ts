import { SignJWT, jwtVerify } from "jose";

import { TokenPayload } from "./types";

export const prepareResponse = <T>(
  error: boolean,
  message: string,
  data: T
) => {
  return { error, message, data };
};

export const key = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as TokenPayload;
}

export const TOKEN_NAME = "auth_token";
