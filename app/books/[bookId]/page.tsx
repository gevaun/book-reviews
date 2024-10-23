import Image from "next/image";
import client, { convertWixImageToUrl } from "@/app/lib/wix";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import PostReviewForm from "./post-review-form";
import BookReviewPage from "./reviews";
import BackButton from "@/components/books/back-button";

export default async function Book({ params }: { params: { bookId: string } }) {
  const { data: book } = await client.items.getDataItem(params.bookId, {
    dataCollectionId: "Books",
    consistentRead: true,
  });

  return (
    <div className="space-y-8">
      <BackButton />
      <Card>
        <CardHeader>``
          <CardTitle className="text-3xl font-bold">{book?.title}</CardTitle>
          <CardDescription>by {book?.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            {book?.coverImage ? (
              <Image
                src={
                  book?.coverImage.includes("static.")
                    ? book?.coverImage
                    : convertWixImageToUrl(book?.coverImage)
                }
                alt={`Book cover of ${book?.title}`}
                className="h-[300px] w-[200px] object-cover float-left rounded-md"
                height={300}
                width={200}
              />
            ) : (
              <div className="flex h-[300px] w-[200px] border rounded-md items-center justify-center">
                <BookOpenIcon className="w-12 h-12 text-gray-500 dark:text-gray-200" />
              </div>
            )}
            <p className="text-muted-foreground">{book?.description}</p>
          </div>
          <div className="clear-both">
            <h3 className="text-xl font-semibold mb-2">Book Details</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>First published: {book?.publicationDate}</li>
              <li>Pages: 180</li>
              <li>Genre: {book?.genre}</li>
              <li>ISBN: {book?.isbn}</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <PostReviewForm bookId={book?._id} />
      <BookReviewPage bookId={book?._id} />
    </div>
  );
}
