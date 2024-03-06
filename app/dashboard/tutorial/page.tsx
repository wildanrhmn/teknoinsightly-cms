import Pagination from '@/app/ui/content/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/content/table';
import { Create } from '@/app/ui/content/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAllPages } from '@/app/lib/data';
 
export default async function Page(
  { searchParams } : {
  searchParams? : {
    query?: string,
    page?: string,
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchAllPages({type: 'tutorial', query: query});

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Tutorial</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tutorial..." />
        <Create text="Tutorial" />
      </div>
       <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} type='tutorial' />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}