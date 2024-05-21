"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "./db/config";
import { comments } from "./db/schema";

export async function fetchComments() {
  try {
    // const fetchedComments = await db
    //   .execute(
    //     sql`
    //     SELECT
    //       comments.id,
    //       comments.content,
    //       comments.likes,
    //       comments.userId,
    //       users.userName
    //     FROM
    //       userComments AS comments
    //     JOIN
    //       users ON comments.userId = users.id
    //     ORDER BY
    //       comments.id DESC
    //   `
    //   )
    //   .then((res) => res[0]);
    const fetchedComments = await db.query.comments.findMany({
      orderBy: desc(comments.id),
    });

    return fetchedComments;
  } catch (error) {
    console.error(error);
  }
}

export async function addComment(formData: FormData) {
  try {
    const newContent = formData.get("newComment")?.valueOf();

    if (!newContent || typeof newContent !== "string")
      throw new Error("not found");

    await db.insert(comments).values({
      content: newContent,
      //   userId,
    });
    revalidatePath("/upvote");
  } catch (error) {
    console.error(error);
  }
}

export async function likeComment(commentId: number, newLikes: number) {
  try {
    await db
      .update(comments)
      .set({ likes: newLikes })
      .where(eq(comments.id, commentId));
    revalidatePath("/upvote");
  } catch (error) {
    console.error(error);
  }
}
