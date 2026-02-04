import Link from 'next/link';
import { cn } from '@/lib/utils'; 

interface SectionItem {
  title: string;
  subtitle: string;
  link: string;
}

interface DashboardSectionProps {
  title: string;
  items: SectionItem[];
  colorClass: string; 
  readAllText: string;
  readMoreText: string;
}

export const DashboardSection = ({ title, items, colorClass, readAllText, readMoreText }: DashboardSectionProps) => {
  return (
    <div className='flex flex-col bg-white w-full flex-[0.4] p-6 lg:p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
        <div className='flex justify-between'>
            <p className='font-bold text-[#505050]'>{title}</p>
            <Link className={cn('font-bold', colorClass)} href={""}>{readAllText} &#8594;</Link>
        </div>
        <div className='flex flex-col flex-1 items-center justify-around'>
            {items.map((item, index) => (
                <div key={index} className={cn('flex flex-col w-full py-8', index !== items.length - 1 && 'border-b border-[#32323232]')}>
                    <p className='text-xl font-bold text-[#323232]'>{item.title}</p>
                    <p className='font-thin'>{item.subtitle}</p>
                    <Link href={item.link} className={cn('font-bold text-sm', colorClass)}>{readMoreText} &#8599;</Link>
                </div>
            ))}
        </div>
    </div>
  );
};