"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { title } from "process";
import { Loader2 } from "lucide-react";

export default function PostReviewForm({ bookId }: { bookId: string }) {
  const initialReviewForm = {
    name: "",
    rating: 0,
    review: "",
  };
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form" + reviewForm);
    setIsLoading(true);
    client.items
      .insertDataItem({
        dataCollectionId: "Reviews",
        dataItem: {
          data: {
            ...reviewForm,
            bookId: bookId,
          },
        },
      })
      // .then(() => {
      //   setReviewForm(initialReviewForm);
      //   toast({
      //     title: "Your review has been submitted",
      //     description: "Thank you for your feedback!",
      //     variant: "default",
      //   });
      // })
      // .catch((error) => {
      //   console.error(error);
      //   toast({
      //     title: "Error",
      //     description:
      //       "Something went wrong. Please try again.",
      //     variant: "destructive",
      //   });
      // })
      // .finally(() => {
      //   setIsLoading(false);
      // });
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
                    className={`h-6 w-6 cursor-pointer ${star <= reviewForm.rating
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
            <Button
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Post Review"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
