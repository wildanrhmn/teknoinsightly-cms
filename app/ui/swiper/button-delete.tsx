'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { DeleteSwiper } from '@/app/lib/actions';
import toast from 'react-hot-toast';

export async function Delete({ id }: { id: string }) {
    return (
          <button onClick={() => { DeleteSwiper(id); toast.success("Success Delete Swiper."); }} className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
    );
  }