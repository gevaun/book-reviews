"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownRightIcon } from "@heroicons/react/16/solid";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import client from "../lib/wix";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "@/hooks/use-toast";

export default function AddBookDialog() {
  const router = useRouter();
  const initialNewBook = {
    title: "",
    author: "",
    description: "",
  };
  const [newBook, setNewBook] = useState(initialNewBook);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    console.log(title);
    const response  = await client.items.insertDataItem({
      dataCollectionId: "Books",
      dataItem: {
        data: {
          title,
          author,
          description,
        },
      },
    });
    router.push(`/books/${response.dataItem?._id}`);
    // .then(() => {
    //     setNewBook(initialNewBook);
    //     toast({
    //         title: "New book created",
    //         description: "Thank you for creating the book"
    //     })
    //     router.push(`/books/${data._id}`);        
    // })
    // .catch((error) => {
    //     toast({
    //         title: "Error",
    //         description: "Something went wrong",
    //         variant: "destructive"
    //     })
    // })
    //  redirect
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="group">
          Add Book{" "}
          <ArrowDownRightIcon className="w-4 inline group-hover:translate-x-1 transition-all duration-200 delay-75" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Book</DialogTitle>
          <DialogDescription>
            If you didn&apos;t find the book you were looking for, you can add
            it here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              value={newBook.title}
              onChange={handleChange}
              required
              placeholder="What is the title?"
            />
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              name="author"
              value={newBook.author}
              onChange={handleChange}
              required
              placeholder="Author.."
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={newBook.description}
              onChange={handleChange}
              placeholder="Type your message here."
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
