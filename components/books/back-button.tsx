"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="mt-4 mb-4" >
        <span className="gap-2 flex items-center group cursor-pointer" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-all duration-200 delay-75" />
      <span>Back</span>

        </span>
    </div>
  );
}
