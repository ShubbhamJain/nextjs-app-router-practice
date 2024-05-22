"use client";

import z from "zod";
import Image from "next/image";
import { useRef, useState } from "react";

import Loader from "./Loader";

import Close from "@/assets/close.svg";
import { login, signup } from "@/server/auth";

export default function SignUp() {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [userHasAccount, setUserHasAccount] = useState(false);

  const handleDialogOpen = () => {
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
    }
  };

  const formAction = async (formData: FormData) => {
    try {
      setIsLoading(true);

      if (userHasAccount) {
        const res = await login(formData);

        if (res.error) throw new Error(res.message);
      } else {
        const res = await signup(formData);

        if (res.error) throw new Error(res.message);
      }

      setIsLoading(false);

      formRef.current?.reset();

      dialogRef.current?.close();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const msg = error.issues?.map((issue) => issue.message).join(" ");
        console.error(`Validation Error: ${msg}`);
      } else {
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDialogOpen}
        className="bg-black text-white rounded-lg p-2 px-4 hover:scale-[105%] transition-all"
      >
        Sign Up
      </button>

      <dialog
        role="dialog"
        ref={dialogRef}
        className="border-slate-500 border-[0.75px] w-fit md:w-[60%] lg:w-[40%] max-w-[600px] h-fit rounded-xl p-3"
      >
        <button
          formMethod="dialog"
          className="flex ml-auto"
          onClick={handleDialogOpen}
        >
          <Image className="size-8" src={Close} alt="Close" />
        </button>

        <div className="mt-8">
          <form ref={formRef} action={formAction} className="contents">
            <div className="px-12 flex flex-col gap-6">
              {!userHasAccount && (
                <input
                  required
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
                />
              )}
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
              />
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
              />
            </div>

            <div className="flex justify-center mt-8">
              {isLoading && <Loader />}
              {!isLoading &&
                (userHasAccount ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#2a2a2a] text-white w-[50%] p-2 rounded-lg font-bold text-lg hover:scale-[102%] transition-all"
                  >
                    Log in
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#2a2a2a] disabled:bg-slate-400 text-white w-[50%] p-2 rounded-lg font-bold text-lg hover:scale-[102%] disabled:hover:scale-[100%] transition-all"
                  >
                    Create Account
                  </button>
                ))}
            </div>
          </form>

          <div className="text-center mt-8 flex flex-col  gap-4 mb-4">
            {!userHasAccount && (
              <p className="text-[#818181] text-sm">
                By clicking {'"'}Create account{'"'}, you agree to the TOS and
                Privacy Policy.
              </p>
            )}

            <span className="flex flex-col sm:flex-row gap-2 justify-center">
              {userHasAccount ? (
                <>
                  <p className="text-[#818181] text-md">No account?</p>
                  <button
                    className="text-blue-500 text-md"
                    onClick={() => setUserHasAccount(false)}
                  >
                    Create One
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[#818181] text-md">
                    Already have an account?
                  </p>
                  <button
                    className="text-blue-500 text-md"
                    onClick={() => setUserHasAccount(true)}
                  >
                    Log in
                  </button>
                </>
              )}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
