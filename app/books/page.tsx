import client from "@/app/lib/wix";
import { BookOpenIcon, ArrowDownRightIcon } from "@heroicons/react/16/solid";

export default async function Books() {
  const books = await client.items
    .queryDataItems({
      dataCollectionId: "Books",
    })
    .find()
    .then((res) => res.items.map((book) => book.data));
  

  return (
    <div>
      <h1 className="text-xl font-medium mb-4">Books</h1>
      <div className="grid grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book?.title}
            className=" border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500"
          >
            <div className=" mb-6 ">
              <BookOpenIcon className="w-10 h-10" />
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
              {book?.title}
            </h4>
            <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-4">
              {" "}
              {book?.author}{" "}
            </p>
            <a
              href="javascript:;"
              className="group flex items-center gap-2 text-sm font-semibold transition-all duration-500 "
            >
              Read More{" "}
              <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
