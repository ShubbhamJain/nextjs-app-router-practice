"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { logout } from "@/server/auth";

import Profile from "@/assets/profile.svg";
import { TokenPayload } from "@/utils/types";

export default function UserAvatar({
  session,
}: {
  session: TokenPayload | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as any)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          id="profileButton"
          onClick={toggleDropdown}
          className="flex items-center justify-center w-10 h-10 rounded-full outline-none hover:scale-[110%] transition-all"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-10 h-10 rounded-full outline-none"
            src={Profile}
            alt="user photo"
          />
        </button>

        {isOpen && (
          <div
            style={{ left: "-50%" }}
            className="absolute mt-2 min-w-36 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <ul>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={`/dashboard/${session?.id!}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="w-full block text-start px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
