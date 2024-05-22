"use client";

import { useEffect, useState } from "react";

const colorSet = [
  {
    bg: "bg-slate-400",
    border: "border-gray-400",
  },
  {
    bg: "bg-sky-400",
    border: "border-sky-500",
  },
  {
    bg: "bg-rose-400",
    border: "border-rose-500",
  },
  {
    bg: "bg-violet-400",
    border: "border-violet-500",
  },
  {
    bg: "bg-amber-400",
    border: "border-amber-500",
  },
];

export default function ProfilePic({ text }: { text: string }) {
  const [colorIndex, setColorIndex] = useState(-1);

  useEffect(() => {
    const index = Math.floor(Math.random() * 5);
    setColorIndex(index);
  }, []);

  return colorIndex > -1 ? (
    <div
      className={`flex items-center justify-center uppercase w-[30px] h-[30px] rounded-[50%] ${colorSet[colorIndex]?.bg} ${colorSet[colorIndex]?.border}`}
    >
      {text}
    </div>
  ) : (
    <div className="w-[30px] h-[30px] bg-slate-400 rounded-[50%] animate-pulse"></div>
  );
}
