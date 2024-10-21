import Image from "next/image";
import { Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRightIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {

  return (
    <div className="space-y-4">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="md:grid md:grid-cols-2 gap-4 sm:space-y-4">
          <Image
            className="justify-self-center"
            src="/undraw_book_lover_re_rwjy.svg"
            alt="Next.js logo"
            width={380}
            height={380}
            priority
          />
          <div className="self-center text-center justify-center rounded-2xl py-4 px-10 bg-zinc-50 dark:bg-zinc-900">
            <h1 className="text-4xl font-bold mb-2">
              <span className={pacifico.className}>The Books Reviews</span>
            </h1>
            <div className="space-y-1">
              <p className="text-lg text-gray-500">
                Your go-to for honest book reviews.
              </p>
              <p className="text-lg text-gray-500">
                Find your next book match.
              </p>
              <p className="text-lg text-gray-500">
                Dive into the best new reads.
              </p>
            </div>
          </div>
        </div>
      </main>
        <div className="flex justify-center p-10">
          <Link
            href="/books"
            type="button"
            className="py-2.5 px-6 text-sm border border-gray-300 rounded-xl shadow-xs bg-zinc-200 font-semibold text-gray-900 transition-all duration-500 hover:bg-zinc-100 group"
          >
            Expore Books{" "}
            <ArrowRightCircleIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
          </Link>
        </div>
    </div>
  );
}
