import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="relative w-full border-b bg-white pb-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div
          onClick={() => router.push("/")}
          className="inline-flex items-center space-x-2 cursor-pointer">
          <span className="font-bold text-2xl">Movies</span>
        </div>
        <div className="flex items-center gap-x-8">
          {!session ? (
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl:
                    process.env.NODE_ENV === "production"
                      ? process.env.NEXT_PUBLIC_PROD
                      : process.env.NEXT_PUBLIC_DEV,
                })
              }
              type="button"
              className="rounded-full bg-[#59abef] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#59abef]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Login
            </button>
          ) : (
            <>
              <Button title={"LogOut"} funtion={signOut} />
              <Link
                href={{ pathname: "/profile" }}
                className="flex items-center space-x-2">
                <img
                  className="inline-block h-11 w-11 rounded-full"
                  src={`${session.user?.image}`}
                  alt="Dan_Abromov"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
