"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { DeletePopular } from "@/app/lib/actions";
import toast from "react-hot-toast";

export async function Delete({ id }: { id: string }) {
  return (
    <button
      onClick={async() => {
        await DeletePopular(id)
        .then((result) => {
          if(result.success){
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        })
      }}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
