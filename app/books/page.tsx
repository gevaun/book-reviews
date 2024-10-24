import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerClient } from "@/app/lib/wix";
// import { convertWixImageToUrl } from "@/app/lib/wix-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Book } from "lucide-react";
import AddBookDialog from "./add-book-dialog";

export default async function Books({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const dataCollectionId = "Books";
  const books = await getServerClient()
    .items.queryDataItems({
      dataCollectionId,
      // consistentRead: true, // Optional, and we do this to ensure we get the latest data
    })
    .startsWith("title", searchParams.search ?? "")
    .find()
    .then((res) => res.items.map((book) => book.data));

  function convertWixImageToUrl(wixImageUrl: string) {
    return `https://static.wixstatic.com/media/${wixImageUrl.split("/")[3]}`;
  }

  const bookElements = books.map((book) => (
    <Link href={`/books/${book?._id}`} key={book?._id}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4">
          {book?.cover ? (
            <Image
              src={
                book?.cover?.includes("static")
                  ? book?.cover
                  : convertWixImageToUrl(book?.cover)
              }
              alt={`Book cover of ${book?.title}`}
              className="w-20 h-30 object-cover float-left rounded-md mr-4"
              height={100}
              width={80}
            />
          ) : (
            <div className="w-20 h-30 object-cover ">
              <Book className="w-12 h-12" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{book?.title}</h2>
            <p className="text-muted-foreground">{book?.author}</p>
            <Button variant="link" className="p-0 h-auto">
              <Book className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  ));

  const bookNotFoundElement = (
    <div className="p-6">
      <div className="flex justify-center">
        <Image
          src="/undraw_lost_re_xqjt.svg"
          alt="No books found"
          width={300}
          height={200}
        />
      </div>
      <p className="text-xl text-center my-4">No books found...</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold mb-4">Books</h1>
        </div>
        <div>
          <form
            action={async (formData) => {
              "use server";
              const search = formData.get("search");
              redirect(`/books?search=${search}`);
            }}
            className="flex gap-2 mb-6"
          >
            <Input
              type="text"
              name="search"
              placeholder="Search books..."
              className="flex-grow"
            />
            <Button type="submit" className="group" variant="secondary">
              Search
              <Search className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
            </Button>
          </form>
        </div>
        <div className="self-start">
          <AddBookDialog />
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {bookElements} */}
        {books.length !== 0 ? (
          bookElements
        ) : (
          <div className="md:col-span-3 lg:col-span-4">
            {" "}
            {bookNotFoundElement}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
