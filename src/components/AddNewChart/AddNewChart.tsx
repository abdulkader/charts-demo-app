import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/components/Context/useApp';
import { SearchMode } from '@/lib/enums';

export function AddNewChart() {
  const { appDispatch } = useApp();
  const openSearchPanel = () => {
    appDispatch({
      type: 'SET_SEARCH_OPEN',
      payload: { open: true, mode: SearchMode.ADD },
    });
  };
  return (
    <Button
      size={'sm'}
      className='!bg-primaryDark !text-white'
      onClick={openSearchPanel}>
      <PlusIcon className='w-4 h-4 mr-2' />
      Add Chart
    </Button>
  );
}
