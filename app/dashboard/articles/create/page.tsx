import Form from '@/app/ui/content/create-form';
import Breadcrumbs from '@/app/ui/content/breadcrumbs';
import { fetchCategories } from '@/app/lib/data';

export default async function Page() {
  const categories = await fetchCategories({ type: 'article' });
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Articles', href: '/dashboard/articles' },
          {
            label: 'Create Articles',
            href: '/dashboard/articles/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}