"use client";

import { useRef } from "react";

import { addComment } from "@/server/comments";
// import { useAuthContext } from "@/context/auth";

export default function CommentInput() {
  //   const router = useRouter();
  //   const {
  //     auth: { user },
  //   } = useAuthContext();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mx-auto items-center w-[100%] justify-center mb-14">
      <span className="bg-[#ECF2F7] p-3 rounded-xl sm:rounded-none sm:rounded-tl-xl sm:rounded-bl-xl text-sm">
        Say Something!
      </span>

      <form
        ref={formRef}
        className="contents"
        action={(formData) => {
          addComment(formData);
          formRef.current?.reset();
        }}
      >
        <input
          required
          name="newComment"
          placeholder="I Wanna be an Engineer!"
          className="border-2 border-[#ECF2F7] px-3 w-[60%] sm:w-[30%] text-xl py-1.5 outline-none rounded-xl sm:rounded-none"
        />

        <button
          type="submit"
          className="bg-[#ECF2F7] text-green-600 p-2 rounded-xl sm:rounded-none sm:rounded-tr-xl sm:rounded-br-xl font-bold text-lg w-[40%] sm:w-28 hover:scale-[108%] sm:hover:scale-[100%] transition-all"
        >
          Post
        </button>
      </form>
    </div>
  );
}
