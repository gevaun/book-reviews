import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import client from "@/app/lib/wix";

export default async function ReviewList({ bookId }: { bookId: string }) {
  const reviews = await client.items
    .queryDataItems({
      dataCollectionId: "Reviews",
      consistentRead: true,
    })
    .eq("bookId", bookId)
    .find()
    .then((response) => response.items.map((item) => item.data));

  const reviewElements = reviews.map((review) => (
    <Card key={review?.id}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{review?.name}</span>
          <span className="text-sm text-muted-foreground">
            {review?._createdDate[1]}
          </span>
        </CardTitle>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                star <= review?.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review?.reviewText}</p>
      </CardContent>
    </Card>
  ));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Previous Reviews</h2>
      {reviews.length ? (
        reviewElements
      ) : (
        <p className="text-muted-foreground">No reviews yet</p>
      )}
    </div>
  );
}
