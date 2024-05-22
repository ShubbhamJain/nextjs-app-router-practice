import { desc, eq } from "drizzle-orm";

import { db } from "./db/config";
import { prepareResponse } from "@/utils";
import { comments, users } from "./db/schema";
import { CommentsWithUserName } from "@/utils/types";

export async function fetchUserComments(userId: number) {
  try {
    const userComments = await db
      .select({
        comments: {
          id: comments.id,
          content: comments.content,
          likes: comments.likes,
          userId: comments.userId,
          userName: users.userName,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.userId, userId))
      .orderBy(desc(comments.id));

    if (!userComments) {
      throw new Error("User comments not found");
    }

    const finalComments = userComments.map((comm) => {
      return comm.comments;
    });

    return prepareResponse(
      false,
      "User comments fetched successfully!",
      finalComments as unknown as CommentsWithUserName[]
    );
  } catch (error) {
    console.error(error);
    return prepareResponse(true, "Error in fetching user comments!", null);
  }
}
