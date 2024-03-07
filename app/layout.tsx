import '@/app/ui/global.css';

import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'TeknoInsightly Content Management System',
  description: 'This is a CMS for TeknoInsightly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
          {children}
        <Toaster position='bottom-center' />
        </body>
    </html>
  );
}
