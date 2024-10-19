import Image from "next/image";
import { Dancing_Script, Pacifico } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="space-y-4">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="md:grid grid-cols-2 gap-4">
          <Image
            className="justify-self-center"
            src="/undraw_book_lover_re_rwjy.svg"
            alt="Next.js logo"
            width={380}
            height={380}
            priority
          />
          <div className="fxdrfrd  self-center text-center justify-center rounded-2xl py-4 px-10 bg-zinc-50 dark:bg-zinc-900">
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
    </div>
  );
}
