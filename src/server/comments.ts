"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "./db/config";
import { comments } from "./db/schema";
import { Comments } from "@/utils/types";
import { likeCommentSchema, postCommentSchema } from "@/utils/zodSchema";

export async function fetchComments() {
  try {
    const fetchedComments = await db
      .execute(
        sql`
        SELECT
          comments.id,
          comments.content,
          comments.likes,
          comments.userId,
          users.userName
        FROM
          userComments AS comments
        JOIN
          users ON comments.userId = users.id
        ORDER BY
          comments.id DESC
      `
      )
      .then((res) => res[0]);

    return fetchedComments as unknown as Comments[];
  } catch (error) {
    console.error(error);
  }
}

export async function addComment(formData: FormData, userId: number) {
  try {
    const newContent = formData.get("newComment")?.valueOf();

    postCommentSchema.parse({ userId, newContent });

    if (!newContent || typeof newContent !== "string")
      throw new Error("not found");

    await db.insert(comments).values({
      content: newContent,
      userId,
    });
    revalidatePath("/upvote");
  } catch (error) {
    console.error(error);
  }
}

export async function likeComment(commentId: number, newLikes: number) {
  try {
    likeCommentSchema.parse({ commentId, newLikes });

    await db
      .update(comments)
      .set({ likes: newLikes })
      .where(eq(comments.id, commentId));
    revalidatePath("/upvote");
  } catch (error) {
    console.error(error);
  }
}
