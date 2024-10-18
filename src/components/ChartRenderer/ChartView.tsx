import { cn } from '@/lib/utils';
import ReactECharts from 'echarts-for-react';

export function ChartView({ option, className, ...props }: any) {
  return (
    <ReactECharts
      option={option}
      className={cn('w-full h-full', className)}
      opts={{ renderer: 'svg' }}
      {...props}
    />
  );
}
