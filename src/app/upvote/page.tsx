import type { Metadata } from "next";

import { getSession } from "@/server/auth";
import { fetchComments } from "@/server/comments";

import CommentsList from "@/components/Comments";
import CommentInput from "@/components/CommentInput";

export const metadata: Metadata = {
  title: "Upvote & Post Comments",
};

export default async function Page() {
  const session = await getSession();
  const comments = await fetchComments();

  return (
    <>
      <p className="text-center text-3xl my-12 font-semibold">
        Upvote comments or Express yourself!
      </p>

      {session?.loggedIn && <CommentInput session={session} />}

      {comments ? <CommentsList comments={comments} session={session} /> : null}
    </>
  );
}
