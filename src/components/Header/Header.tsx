import { ThemeToggle } from '@/components/ThemeToggle';
import { AddNewChart } from '@/components/AddNewChart';

export function Header() {
  return (
    <>
      <header className='flex items-center justify-between w-full sticky top-0 z-50 backdrop-blur-md p-4 border-b dark:border-primary/10 border-slate-100'>
        <h1 className='text-2xl font-bold text-primaryDark dark:text-primary'>
          Chart App
        </h1>
        <div className='flex items-center gap-2 justify-end'>
          <AddNewChart />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
