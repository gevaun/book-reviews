"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { BookOpenIcon, ArrowDownRightIcon } from "@heroicons/react/16/solid";

const links = [
  { href: "/books", label: "Books" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navigation() {
  const pathname = usePathname();

  const linkElements = links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx(
        "tranistion-all duration-200 delay-50 opacity-75 hover:opacity-100 px-4 py-1",
        {
          "opacity-100 rounded-lg bg-zinc-100 dark:bg-zinc-900":
            pathname === href,
        }
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
        <Link
          href="login/"
          className="px-4 py-1 self-center rounded-lg bg-zinc-100 dark:bg-zinc-900 group"
        >
          Login{" "}
          <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
        </Link>
      </div>
    </nav>
  );
}
