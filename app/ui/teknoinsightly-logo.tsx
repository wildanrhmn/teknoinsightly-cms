import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function TeknoInsightLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src="/logo.webp" width={100} height={100} alt='TeknoInsightly Logo' />
      <p className="text-[44px]">TeknoInsightly.</p>
    </div>
  );
}
