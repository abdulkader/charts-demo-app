import { Chart } from '@/@types';
import { AddNewChart } from '@/components/AddNewChart/AddNewChart';
import { ChartRenderer } from '@/components/ChartRenderer';
import { LOAD_CHARTS } from '@/components/Context/AppProvider';
import { useApp } from '@/components/Context/useApp';
import { Loader } from '@/components/Loader';
import { fetchCharts } from '@/services/charts.service';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function Homepage() {
  const { appState, appDispatch } = useApp();
  const { data, isFetched, isLoading } = useQuery({
    queryKey: ['charts'],
    queryFn: fetchCharts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isFetched) {
      appDispatch({ type: LOAD_CHARTS, payload: data });
    }
  }, [isFetched, appDispatch, data]);

  if (isLoading) {
    return (
      <div className='p-8 w-full flex justify-center items-center'>
        <Loader />
      </div>
    );
  }
  if (appState.charts.length === 0) {
    return (
      <div className='p-2 md:p-4'>
        <div className='flex justify-center items-center p-4 md:p-8 border-2 border-dashed border-gray-100 dark:border-primary/40 rounded-md'>
          <AddNewChart />
        </div>
      </div>
    );
  }
  return (
    <div className='p-2 md:p-4 flex flex-col gap-4'>
      {appState.charts.map((chart: Chart) => (
        <ChartRenderer key={chart.id} chart={chart} />
      ))}
    </div>
  );
}
