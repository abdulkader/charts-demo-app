import { useRef } from 'react';
import { SeriesListItem } from './SeriesListItem';
import List from 'rc-virtual-list';
import { Series } from '@/@types';

export function SeriesList({
  series,
  onAddNew,
}: {
  series: Series[];
  onAddNew: (props: Series) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={parentRef} className='w-full h-full flex flex-1'>
      <List data={series} itemKey='id' className='w-full h-full flex flex-1'>
        {(item) => (
          <SeriesListItem key={item.id} series={item} onAddNew={onAddNew} />
        )}
      </List>
    </div>
  );
}
