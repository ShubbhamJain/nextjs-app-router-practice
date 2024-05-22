import type { Metadata, ResolvingMetadata } from "next";

import { getSession } from "@/server/auth";
import { CommentsWithUserName } from "@/utils/types";

import ProfilePic from "@/components/ProfilePic";
import { fetchUserComments } from "@/server/user";

function UserComments({ comments }: { comments: CommentsWithUserName[] }) {
  return (
    <div className="flex flex-col gap-7 mx-auto w-full sm:w-[50%] md:w-[95%] h-[400px]">
      {comments?.map((comment, key) => (
        <div key={key} className="w-full">
          <div className="flex justify-between mb-3 px-5">
            <div className="flex gap-6">
              <ProfilePic text={comment?.userName?.charAt(0)} />
              <p className="text-lg">{comment.content}</p>
            </div>

            <div className="flex items-center gap-5">
              <p>{comment.likes ?? 0}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const session = await getSession();

  return {
    title: session?.userName + "'s Dashboard",
  };
}

export default async function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const session = await getSession();
  const userComments = await fetchUserComments(parseInt(userId));

  if (!session)
    return (
      <div className="text-center">
        <p className="text-5xl">404</p>
      </div>
    );

  return (
    <main className="flex justify-center">
      <div className="flex h-full w-full flex-col md:max-w-2xl">
        <div className="mb-14">
          <p className="text-3xl mb-3 font-bold">{session?.userName}</p>
          <p className="text-xl">{session?.email}</p>
        </div>

        <UserComments comments={userComments.data ?? []} />
      </div>
    </main>
  );
}
