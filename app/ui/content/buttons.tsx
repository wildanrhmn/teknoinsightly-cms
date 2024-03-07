'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeletePost } from '@/app/lib/actions';
import toast from 'react-hot-toast';

export function Create({text}: {text: string}) {
  return (
    <Link
      href={`/dashboard/${text}/create`}
      className="flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create {text.charAt(0).toUpperCase() + text.slice(1)}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function Update({ id, text }: { id: string, text: string }) {
  const route = text === 'tutorial' ? 'tutorial' : 'articles';
  return (
    <Link
      href={`/dashboard/${route}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function Delete({ id, public_id }: { id: string, public_id: string }) {
  return (
        <button onClick={() => { DeletePost(id, public_id); toast.success("Success Delete Post."); }} className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
  );
}
