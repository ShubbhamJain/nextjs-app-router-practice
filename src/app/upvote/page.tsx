// import { useAuthContext } from "@/context/auth";
// import { APIResponseType, CommentsWithUserName } from "@/utils/types";

import type { Metadata } from "next";

import { fetchComments } from "@/server/comments";

import CommentsList from "@/components/Comments";
import CommentInput from "@/components/CommentInput";

export const metadata: Metadata = {
  title: "Upvote & Post Comments",
};

export default async function Page() {
  //   const { auth } = useAuthContext();
  const comments = await fetchComments();

  return (
    <>
      <p className="text-center text-3xl my-12 font-semibold">
        Upvote comments or Express yourself!
      </p>

      {/* {auth.isLoggedIn && <CommentInput />} */}
      <CommentInput />

      {comments ? <CommentsList comments={comments} /> : null}
    </>
  );
}
