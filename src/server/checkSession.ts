"use server";

import { NextRequest, NextResponse } from "next/server";

import { TOKEN_NAME, decrypt, encrypt } from "@/utils";

export async function checkSession(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_NAME)?.value;

    if (!token) return;

    const payload = await decrypt(token);

    if (new Date(payload.exp! * 1000) < new Date()) {
      const res = NextResponse.next();
      res.cookies.delete(TOKEN_NAME);
      return;
    }

    const res = NextResponse.next();

    const newToken = await encrypt({
      id: payload.id,
      userName: payload.userName,
      email: payload.email,
      loggedIn: true,
    });

    res.cookies.set({
      name: TOKEN_NAME,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      expires: 3600,
    });
  } catch (error) {
    console.log(error);
  }
}
