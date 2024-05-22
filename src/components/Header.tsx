import Link from "next/link";
import Image from "next/image";

import { getSession } from "@/server/auth";

import SignUp from "@/components/SignUp";
import UserAvatar from "@/components/UserAvatar";

import ChevronRight from "@/assets/chevronright.svg";
import ChevronUpDown from "@/assets/chevronupdown.svg";

export async function Header() {
  const session = await getSession();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6">
      <Link href={"/"}>
        <span className="flex items-center mb-4 sm:mb-0">
          <p className="text-3xl font-bold">UpVoteMe</p>
          <Image className="size-12" src={ChevronUpDown} alt="ChevronUpDown" />
        </span>
      </Link>

      <div className="flex gap-3 items-center">
        {!session?.loggedIn && <SignUp />}
        {!!session?.loggedIn && <UserAvatar session={session} />}

        <Link href={"/about"} as={"/about"}>
          <button className="flex items-center gap-3 bg-blue-500 text-white rounded-lg p-2 hover:scale-[105%] transition-all">
            About
            <Image
              className="size-4 hidden sm:block"
              src={ChevronRight}
              alt="ChevronRight"
            />
          </button>
        </Link>

        <Link href={"/upvote"} as={"/upvote"}>
          <button className="flex items-center gap-3 bg-green-600 text-white rounded-lg p-2 hover:scale-[105%] transition-all">
            Comment/Upvote
            <Image
              className="size-4 hidden sm:block"
              src={ChevronRight}
              alt="ChevronRight"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
