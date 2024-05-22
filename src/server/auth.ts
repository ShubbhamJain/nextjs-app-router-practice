"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { compare, genSalt, hash } from "bcrypt";

import { db } from "./db/config";
import { users } from "./db/schema";
import { signInSchema, signUpSchema } from "@/utils/zodSchema";
import { TOKEN_NAME, decrypt, encrypt, prepareResponse } from "@/utils";

export async function signup(formData: FormData) {
  try {
    const email = formData.get("email")?.valueOf()! as string;
    const password = formData.get("password")?.valueOf()! as string;
    const userName = formData.get("userName")?.valueOf()! as string;

    signUpSchema.parse({ email, password, userName });

    const user = await db
      .select()
      .from(users)
      .where(eq(users.userName, userName));

    if (user.length) {
      throw new Error("User with same username already exists!");
    }

    const salt = await genSalt(10).catch((error: Error) => {
      throw new Error(error.message);
    });
    const hashedPwd = await hash(password, salt).catch((error: Error) => {
      throw new Error(error.message);
    });

    const newUser = await db.transaction(async (tx) => {
      const newUserId = await db
        .insert(users)
        .values({
          email,
          password: hashedPwd,
          userName,
        })
        .then((res) => res[0].insertId);

      const newUser = await db.query.users.findFirst({
        where: eq(users.id, newUserId),
        columns: {
          email: true,
          id: true,
          userName: true,
        },
      });

      return newUser;
    });

    const token = await encrypt({
      id: newUser?.id,
      userName,
      email,
      loggedIn: true,
    });

    cookies().set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      expires: 3600,
    });

    return prepareResponse(
      false,
      "User signed up successfully!",
      {
        id: newUser?.id,
        email: newUser?.email,
        userName: newUser?.userName,
        loggedIn: true,
      } ?? null
    );
  } catch (error: any) {
    return prepareResponse(
      true,
      error.message || "Error in signing up user!",
      null
    );
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get("email")?.valueOf()! as string;
    const password = formData.get("password")?.valueOf()! as string;

    console.log("🚀 ~ login ~ password:", password);

    signInSchema.parse({ email, password });

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log("🚀 ~ login ~ user:", user);

    if (!user) {
      throw new Error("Incorect Credentials!");
    }

    const res = await compare(password, user.password);

    if (!res) {
      throw new Error("Incorect Credentials!");
    }

    const token = await encrypt({
      id: user.id,
      userName: user.userName,
      email,
      loggedIn: true,
    });

    cookies().set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      expires: 3600,
    });

    return prepareResponse(
      false,
      "User logged in successfully!",
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
        loggedIn: true,
      } ?? null
    );
  } catch (error: any) {
    return prepareResponse(
      true,
      error.message || "Error in signing in user!",
      null
    );
  }
}

export async function logout() {
  // Destroy the session
  cookies().set(TOKEN_NAME, "", { expires: new Date(0) });
}

export async function getSession() {
  try {
    const session = cookies().get(TOKEN_NAME)?.value;
    if (!session) return null;
    const userSession = await decrypt(session);

    if (!userSession) throw new Error("Session not found!");

    return userSession;
  } catch (error) {
    console.log(error);
    return null;
  }
}
