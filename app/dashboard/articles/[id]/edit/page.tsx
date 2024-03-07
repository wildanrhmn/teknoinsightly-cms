import Form from '@/app/ui/content/edit-form';
import Breadcrumbs from '@/app/ui/content/breadcrumbs';
import { fetchCategories, fetchPostById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [post, category] = await Promise.all([
    fetchPostById(id),
    fetchCategories({type: 'article'}),
  ])
  if(!post){
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Articles', href: '/dashboard/articles' },
          {
            label: 'Edit Articles',
            href: `/dashboard/articles/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form dataPost={post} categories={category} />
    </main>
  );
}