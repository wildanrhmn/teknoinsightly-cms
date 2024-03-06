import { Update, Delete } from '@/app/ui/content/buttons';
import { fetchPostsByType } from '@/app/lib/data';
import { Post } from '@/app/lib/definitions';

export default async function Table({
  query,
  currentPage,
  type,
}: {
  query: string;
  currentPage: number;
  type: string;
}) {
  const posts = await fetchPostsByType(type, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {posts?.map((post: Post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{post.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{`Dibuat oleh ${post.Author.name}`}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{`Dibuat pada ${post.created_at}`}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Update id={post.id} />
                    <Delete id={post.id} public_id={post.image[0]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts?.map((post: Post) => (
                <tr
                  key={post.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{post.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.updated_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.Author.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Update id={post.id} />
                      <Delete id={post.id} public_id={post.image[0]}  />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
