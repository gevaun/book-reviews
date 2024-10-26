"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { BookOpenIcon, ArrowDownRightIcon, ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { loginAction, logoutAction } from "@/app/actions";
import { getClient } from "@/lib/wix-client";
import { getMember } from "@/lib/wix";

const links = [
  { href: "/books", label: "Books" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navigation() {
  const pathname = usePathname();
  const client = getClient();
  const member = getMember();

  const linkElements = links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx(
        "tranistion-all duration-200 delay-50 px-4 py-1",
        {
          "opacity-100 rounded-lg bg-zinc-100 dark:bg-zinc-900":
            pathname === href,
        },
        { "opacity-75 hover:opacity-100": pathname !== href }
      )}
    >
      {label}
    </Link>
  ));

  return (
    <nav className="h-20 sm:px-6">
      <div className="flex h-full justify-between">
        <div className="flex items-center h-full space-x-4">
          <Link href="/">
            <BookOpenIcon className="w-6" />
          </Link>
          <div className="space-x-2">{linkElements}</div>
        </div>
        <div className="self-center">
          {client.auth.loggedIn() ? (
            <>
            <div>
              {member?.nickname}
            </div>
            <form action={logoutAction}>
              <button className="px-4 py-1 self-center rounded-lg bg-zinc-100 dark:bg-zinc-900 group">
                Logout
                <ArrowUpRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
              </button>
            </form>
            </>
          ) : (
            <form action={loginAction}>
              <button className="px-4 py-1 self-center rounded-lg bg-zinc-100 dark:bg-zinc-900 group">
                Login{" "}
                <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
