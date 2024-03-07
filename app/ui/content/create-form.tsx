"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

import { useState, useEffect } from "react";
import { PaperClipIcon, TagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { FormDataSchema } from "@/app/lib/Schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost } from "@/app/lib/actions";
import { Category } from "@/app/lib/definitions";

type Inputs = z.infer<typeof FormDataSchema>;

const Editor = dynamic(() => import("./Editor"), { ssr: false });

export default function Form({categories}: {categories: Category[]}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const { title, body, summary, image, category } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("summary", summary);
    formData.append("category", category);
    formData.append("image", image[0]);
    formData.append("type", pathname.includes("/articles") ? "article" : "tutorial");

    const result: any = await createPost(formData);
    if (result.success) {
      toast.success(result.message);
    }
    if (!result.success) {
      toast.error(result.message);
    }

    router.push("/dashboard/articles");
    setIsLoading(false);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    register("body");
    register("summary");
  }, [register]);

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                type="text"
                placeholder="Enter title..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                {...register("title")}
              />
              <PaperClipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.title?.message && (
              <p
                className="text-sm text-red-400"
                aria-describedby="title-error"
              >
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="mb-2 block text-sm font-medium">
            Enter Body
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Editor value="" onChange={(value) => setValue("body", value)} />
            </div>
            {errors.body?.message && (
              <p className="text-sm text-red-400" aria-describedby="body-error">
                Body is required.
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="mb-2 block text-sm font-medium">
            Enter Summary
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Editor
                value=""
                onChange={(value) => setValue("summary", value)}
              />
            </div>
            {errors.summary?.message && (
              <p className="text-sm text-red-400" aria-describedby="body-error">
                Summary is required.
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-error"
              {...register("category")}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {errors.category?.message && (
            <p className="text-sm text-red-400" aria-describedby="category-error">
              {errors.category.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Input Image
          </label>
          <div className="relative mt-2 flex cursor-pointer flex-col rounded-md border border-dashed border-gray-200 text-gray-400">
            <input
              id="image"
              type="file"
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              aria-describedby="image-error"
              {...register("image")}
              onChange={handleImageChange}
            />
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg
                className="text-current-50 mr-1 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="m-0 text-[14px]">
                Drag your files here or click in this area
              </p>
            </div>
          </div>
          {errors.image?.message && (
            <p className="text-sm text-red-400" aria-describedby="image-error">
              {errors.image.message.toString()}
            </p>
          )}
          <div className="mt-5">
            {imagePreview && (
              <div className="relative flex cursor-move select-none flex-col items-center overflow-hidden rounded border bg-gray-100 text-center">
                <button
                  onClick={() => {
                    setImagePreview(null);
                    resetField("image");
                  }}
                  className="absolute right-0 top-0 z-50 rounded-bl bg-white p-1 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <Image
                  src={imagePreview}
                  alt="Image Preview"
                  width={500}
                  height={500}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="mt-6"
        id="validation-error"
        aria-live="polite"
        aria-atomic="true"
      ></div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/articles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {isLoading ? "Loading..." : "Create Article"}
        </Button>
      </div>
    </form>
  );
}
