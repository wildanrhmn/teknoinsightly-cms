import { Delete } from './button-delete';
import { fetchSwiperData } from '@/app/lib/data';
import { Swiper } from '@/app/lib/definitions';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const swipers = await fetchSwiperData(currentPage, query);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {swipers?.map((swiper: Swiper) => (
              <div
                key={swiper.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{swiper.Post.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{`Dibuat oleh ${swiper.Post.Author?.name}`}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{`Dibuat pada ${swiper.created_at}`}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Delete id={swiper.id}  />
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
              {swipers?.map((swiper: Swiper) => (
                <tr
                  key={swiper.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{swiper.Post.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {swiper.Post.type.charAt(0).toUpperCase() + swiper.Post.type.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {swiper.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {swiper.updated_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {swiper.Post.Author?.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Delete id={swiper.id} />
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
