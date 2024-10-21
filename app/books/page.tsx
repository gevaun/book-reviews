import client, { convertWixImageToUrl } from "@/app/lib/wix";
import { BookOpenIcon, ArrowDownRightIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Books() {
  const books = await client.items
    .queryDataItems({
      dataCollectionId: "Books",
      consistentRead: true, // Optional, and we do this to ensure we get the latest data
    })
    .find()
    .then((res) => res.items.map((book) => book.data));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium mb-4">Books</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <Link href={`/books/${book?._id}`} key={book?._id} className="group">
            <div
              key={book?.title}
              className=" border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500"
            >
              <div className=" flex items-center justify-center mb-6">
                {book?.coverImage ? (
                  <Image
                    src={
                      book.coverImage.includes("static.")
                        ? book.coverImage
                        : convertWixImageToUrl(book.coverImage)
                    }
                    alt={`Book cover of ${book?.title}`}
                    className="h-[300px] w-[200px]  object-cover float-left rounded-md"
                    height={300}
                    width={200}
                  />
                ) : (
                  <div className="flex h-[300px] w-[200px] border rounded-md items-center justify-center">
                    <BookOpenIcon className="w-12 h-12 text-gray-500 dark:text-gray-200" />
                  </div>
                )}
              </div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-2 capitalize transition-all duration-500">
                {book?.title}
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-4">
                {" "}
                {book?.author}{" "}
              </p>
              Read Reviews{" "}
              <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center p-10">
        <Button
          type="button"
          className="py-2.5 px-6 text-sm border border-gray-300 rounded-lg shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-zinc-100 group"
        >
          Add Book{" "}
          <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
        </Button>
      </div>
    </div>
  );
}
