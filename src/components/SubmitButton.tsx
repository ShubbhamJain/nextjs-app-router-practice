"use client";

import Image from "next/image";

import { likeComment } from "@/server/comments";

import LikeButton from "@/assets/likebutton.svg";

export default function SubmitButton({
  commentId,
  commentLikes,
}: {
  commentId: number;
  commentLikes: number;
}) {
  return (
    <button onClick={() => likeComment(commentId, commentLikes + 1)}>
      <Image height={20} src={LikeButton} alt="like-button" />
    </button>
  );
}
