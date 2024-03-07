"use client";
import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginDataSchema } from "../lib/Schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticate } from "../lib/actions";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

type Inputs = z.infer<typeof LoginDataSchema>;
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result: any = await authenticate(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    reset();
    router.push("/dashboard");
  }
  return (
    <form className="space-y-3" onSubmit={handleSubmit(processForm)}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                {...register("email")}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email?.message && (
              <p
                className="text-sm text-red-400"
                aria-describedby="email-error"
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="Enter password"
                required
                minLength={6}
                {...register("password")}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password?.message && (
              <p
                className="text-sm text-red-400"
                aria-describedby="password-error"
              >
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
