import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

export function SearchForm({
  onSubmit,
  searchValue,
}: {
  onSubmit: (search: string) => void;
  searchValue: string;
}) {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get('search')?.toString()?.trim();
    if (!search) {
      toast.error('Please enter a search term');
      return;
    }
    onSubmit(search);
  };
  return (
    <form
      className='flex items-center gap-2 align-middle w-auto'
      onSubmit={handleFormSubmit}>
      <Input
        type='text'
        placeholder='Search for a series'
        className='w-auto'
        name='search'
        defaultValue={searchValue}
      />
      <Button type='submit'>
        <SearchIcon className='w-4 h-4' />
      </Button>
    </form>
  );
}
