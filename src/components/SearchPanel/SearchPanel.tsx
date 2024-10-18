import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { SearchForm } from './SearchForm';
import { Loader } from '@/components/Loader';
import { useQuery } from 'react-query';
import { searchSeries } from '@/services/fred.service';
import { useState } from 'react';
import { SeriesList } from './SeriesList';
import { useApp } from '@/components/Context/useApp';
import {
  SET_SEARCH_OPEN,
  SET_SEARCH_VALUE,
} from '@/components/Context/AppProvider';
import { SearchMode } from '@/lib/enums';
import { Series } from '@/@types';
import { AddChartDialog } from '../ChartDialogs/AddChartDialog';

export function SearchPanel() {
  const { appState, appDispatch } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const { data, isLoading, isFetched, isError, error } = useQuery({
    queryKey: ['series', { search }],
    queryFn: () => searchSeries(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const handleAddNew = (series: Series) => {
    setSelectedSeries(series);
    setAddNewModalOpen(true);
  };
  const handleSearch = (search: string) => {
    setSearch(search);
    appDispatch({ type: SET_SEARCH_VALUE, payload: search });
  };
  const handleOpenChange = (open: boolean) => {
    appDispatch({ type: SET_SEARCH_OPEN, payload: open });
  };
  return (
    <Drawer open={appState.searchOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className='min-h-[70vh] max-h-[60vh] overflow-y-auto'>
        <DrawerHeader className='border-b dark:border-primary/10 border-slate-100 sticky top-0 backdrop-blur-lg bg-[var(--background)]/50 z-40'>
          <DrawerTitle className='px-4'>
            {appState.searchMode === SearchMode.EDIT
              ? 'Edit Chart'
              : 'Add New Chart'}
          </DrawerTitle>
          <div className='flex justify-between p-4 items-center align-middle gap-2 border-b dark:border-primary/10 border-slate-100'>
            <span className='text-sm'>
              {appState.searchMode === SearchMode.EDIT
                ? 'Search for a series to edit.'
                : 'Search for a series to add to your charts.'}
            </span>
            <SearchForm
              onSubmit={handleSearch}
              searchValue={appState.searchValue}
            />
          </div>
        </DrawerHeader>
        <div className='mx-auto w-full p-4'>
          {isLoading ? (
            <div className='flex justify-center items-center w-full h-full flex-1'>
              <Loader />
            </div>
          ) : isFetched && !isError ? (
            <>
              <span className='text-sm w-full block px-2'>
                Found {data?.count} series.
              </span>
              <SeriesList
                series={data?.seriess || []}
                onAddNew={handleAddNew}
              />
            </>
          ) : isError ? (
            <div className='flex justify-center items-center w-full h-full flex-1'>
              <span className='text-sm text-red-500'>
                Error: {(error as any)?.message}
              </span>
            </div>
          ) : null}
        </div>
        {selectedSeries && addNewModalOpen ? (
          <AddChartDialog
            open={addNewModalOpen}
            setOpen={setAddNewModalOpen}
            series={selectedSeries}
          />
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
