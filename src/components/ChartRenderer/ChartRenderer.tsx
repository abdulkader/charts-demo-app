import type { Chart } from '@/@types';
import { fetchSeriesObservations } from '@/services/fred.service';
import { useQuery } from 'react-query';
import { Loader } from '@/components/Loader';
import { useMemo } from 'react';
import { ChartView } from './ChartView';
import { DeleteDialog } from '@/components/ChartDialogs/DeleteDialog';
import { EditChartDialog } from '@/components/ChartDialogs/EditChartDialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatNumberVal } from '@/lib/utils';

export function ChartRenderer({ chart }: { chart: Chart }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'charts',
      {
        seriesId: chart.seriesId,
        frequency: chart.frequency,
        id: chart.id,
      },
    ],
    queryFn: () => fetchSeriesObservations(chart.seriesId, chart.frequency),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: !!chart.seriesId,
  });

  const chartOption = useMemo(() => {
    const option = {
      title: {
        text: chart.title,
        subtext: '',
        left: 'center',
      },
      color: chart?.color || '#FF9D3D',
      tooltip: {
        trigger: 'axis',
        show: true,
        valueFormatter: (value: number) => `${chart.yAxisLabel} - ${value}`,
      },
      xAxis: {
        type: 'category',
        data: data?.observations?.map((observation: any) => observation.date),
      },
      yAxis: {
        type: 'value',
        name: chart.yAxisLabel,
        nameLocation: 'center',
        nameRotate: 90,
        nameGap: 50,
        axisLabel: {
          formatter: (value: number) => formatNumberVal(value, 2, 0),
        },
      },
      series: [
        {
          data: data?.observations?.map(
            (observation: any) => observation.value,
          ),
          type: chart.type,
          smooth: chart.type === 'line' ? true : false,
        },
      ],
    };
    return option;
  }, [data, chart]);

  if (isError) {
    return (
      <div className='flex justify-center items-center p-4 md:p-8 border-2 border-dashed border-gray-100 dark:border-primary/40 rounded-md'>
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the chart. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center p-4 md:p-8 border-2 border-dashed border-gray-100 dark:border-primary/40 rounded-md  min-h-[400px]'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='w-full block min-h-[400px] bg-white dark:bg-slate-50 rounded-lg p-4 relative text-primary dark:text-primaryDark border-2 border-dashed border-gray-100 dark:border-primary/40'>
      <ChartView option={chartOption} />
      <DeleteDialog chart={chart} />
      <EditChartDialog chart={chart} />
    </div>
  );
}
