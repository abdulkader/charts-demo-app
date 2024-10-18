import { forwardRef } from 'react';
import { toast } from 'sonner';
import { Series } from '@/@types';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

export interface SeriesListItemProps {
  onAddNew: (props: Series) => void;
  series: Series;
}

export const SeriesListItem = forwardRef<HTMLDivElement, SeriesListItemProps>(
  ({ onAddNew, series }, ref) => {
    const { id, title, observation_start, observation_end, frequency } = series;
    const copyId = async () => {
      await navigator.clipboard.writeText(id || '');
      toast.success('ID copied to clipboard');
    };
    return (
      <div className='flex w-full md:w-1/3 p-2 relative' ref={ref}>
        <div className='relative flex flex-col overflow-hidden rounded-lg border border-slate-100 dark:border-primary/20 p-2 md:p-4 group w-full justify-between'>
          <span className='absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-600' />
          <div className='sm:flex sm:justify-between sm:gap-4'>
            <div>
              <h3 className='text-base font-semibold'>{title}</h3>

              <p
                className='mt-1 text-xs font-medium cursor-text'
                onClick={copyId}>
                ID: {id}
              </p>
            </div>
          </div>
          <dl className='mt-6 flex gap-4 sm:gap-6'>
            <div className='flex flex-col'>
              <dt className='text-sm font-medium'>Frequency</dt>
              <dd className='text-xs'>{frequency}</dd>
            </div>

            <div className='flex flex-col'>
              <dt className='text-sm font-medium'>Observation Start</dt>
              <dd className='text-xs'>{observation_start}</dd>
            </div>

            <div className='flex flex-col'>
              <dt className='text-sm font-medium'>Observation End</dt>
              <dd className='text-xs'>{observation_end}</dd>
            </div>
          </dl>
          <div className='relative md:absolute md:top-auto md:bottom-0 md:right-0 md:left-0 md:hidden md:group-hover:flex flex z-10 w-full justify-center items-center p-1 align-middle backdrop-blur-md shadow-lg shadow-primary/20'>
            <Button
              className=' animate-in slide-in-from-bottom'
              type='button'
              onClick={() => onAddNew(series)}>
              <PlusCircle className='w-4 h-4 mr-1' />
              Add New Chart
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
