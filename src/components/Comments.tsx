import { Comments, TokenPayload } from "@/utils/types";

import ProfilePic from "./ProfilePic";
import SubmitButton from "./SubmitButton";

export default function CommentsList({
  comments,
  session,
}: {
  comments: Comments[];
  session: TokenPayload | null;
}) {
  return (
    <div className="flex flex-col gap-7 mx-auto w-full sm:w-[50%] md:w-[40%] h-[400px]">
      {comments?.map((comment, key) => (
        <div key={key} className="w-full">
          <div className="flex justify-between mb-7 px-5">
            <div className="flex gap-10">
              <ProfilePic text={"sj"} />
              <p className="text-lg">{comment.content}</p>
            </div>

            <div className="flex items-center gap-5">
              <p>{comment.likes ?? 0}</p>
              {session?.loggedIn && (
                <SubmitButton
                  commentId={comment.id}
                  commentLikes={comment.likes}
                />
              )}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
