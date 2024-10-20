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


export default async function Book({ params }: { params: { bookId: string } }) {
  console.log(typeof params.bookId, params.bookId);
  const { data: book } = await client.items.getDataItem(params.bookId, {
    dataCollectionId: "Books",
    // consistentRead: true,
  });

  console.log(book?.coverImage)

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book?.title}</CardTitle>
          <CardDescription>by {book?.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <Image
                src={book?.coverImage.includes("static.") 
                  ? book?.coverImage 
                  : convertWixImageToUrl(book?.coverImage)}
                alt={`Book cover of ${book?.title}`}
                className="h-[300px] w-[200px] object-cover float-left rounded-md"
                height={300}
                width={200}
            />
            <p className="text-muted-foreground">
              {book?.description}
            </p>
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
      </Card>
    </div>
  );
}
