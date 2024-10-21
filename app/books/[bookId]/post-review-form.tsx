"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import client from "@/app/lib/wix";

export default function PostReviewForm({ bookId }: { bookId: string }) {
  const initialReviewForm = {
    name: "",
    rating: 0,
    review: "",
  };

  const [reviewForm, setReviewForm] = useState(initialReviewForm);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(reviewForm);
    // Here you would typically send the review to your backend
    await client.items.insertDataItem({
      dataCollectionId: "Reviews",
      dataItem: {
        data: {
          ...reviewForm,
          bookId: bookId,
        },
      },
    });

    // Reset form
    // setReviewForm(initialReviewForm);
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>
            Share your thoughts about The Great Gatsby
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4 space-y-4">
              <Label htmlFor="Name" className="block text-sm font-medium mb-1">
                {" "}
                name
              </Label>
              <Input
                type="text"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, name: e.target.value })
                }
                placeholder="Name"
                className="w-1/3"
              />
              <Label
                htmlFor="rating"
                className="block text-sm font-medium mb-1"
              >
                Rating
              </Label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= reviewForm.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() =>
                      setReviewForm({ ...reviewForm, rating: star })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="review"
                className="block text-sm font-medium mb-1"
              >
                Your Review
              </Label>
              <Textarea
                id="review"
                placeholder="Write your review here..."
                value={reviewForm.review}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, review: e.target.value })
                }
                rows={5}
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
