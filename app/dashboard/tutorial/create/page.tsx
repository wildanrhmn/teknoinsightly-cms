import Form from '@/app/ui/content/create-form';
import Breadcrumbs from '@/app/ui/content/breadcrumbs';
import { fetchCategories } from '@/app/lib/data';

export default async function Page() {
  const categories = await fetchCategories({ type: 'tutorial' });
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tutorials', href: '/dashboard/tutorial' },
          {
            label: 'Create Tutorials',
            href: '/dashboard/tutorial/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}