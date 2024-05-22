import z from "zod";

export const signUpSchema = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string(),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const postCommentSchema = z.object({
  userId: z.number().nonnegative(),
  newContent: z.string(),
});

export const likeCommentSchema = z.object({
  commentId: z.number().nonnegative(),
  newLikes: z.number().nonnegative(),
});

export const userSchema = z.object({
  userId: z.number().nonnegative(),
});
