import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import client, { convertWixImageToUrl } from "@/app/lib/wix";
import { ArrowDownRightIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Book } from "lucide-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const GetServerSideProps = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  console.log(searchParams.search);
  const dataCollectionId = "Books";
  const books = await client.items
    .queryDataItems({
      dataCollectionId,
      // consistentRead: true, // Optional, and we do this to ensure we get the latest data
    })
    // .startsWith("title", searchParams.search ?? "")
    .find()
    .then((res) => res.items.map((book) => book.data));
  return { props: { books } };
};

export default async function Books({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  console.log(searchParams.search);
  const dataCollectionId = "Books";
  const books = await client.items
    .queryDataItems({
      dataCollectionId,
      // consistentRead: true, // Optional, and we do this to ensure we get the latest data
    })
    .startsWith("title", searchParams.search ?? "")
    .find()
    .then((res) => res.items.map((book) => book.data));

  const bookElements = books.map((book) => (
    <Link href={`/books/${book?._id}`} key={book?._id}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center p-4">
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
            <div className="w-20 h-30 object-cover mr-4">
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
      <p className="text-xl text-center my-4">
      No books found...
      </p>

    </div>
  );

  console.log(books.length)
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
              // value={search}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="group" variant="secondary">
              Search
              <Search className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
            </Button>
          </form>
        </div>
        <div className="self-start">
          <Button type="button" className="group">
            Add Book{" "}
            <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {bookElements} */}
        {books.length !== 0 ? (
          bookElements
        ) : (
          <div className="md:col-span-3 lg:col-span-4"> {bookNotFoundElement} </div>
        )}
      </div>
    </div>
  );
}
