import { localStore } from '@/lib/localStore';

export const fetchCharts = async () => {
  const response = localStore.getItem('charts');
  return response || [];
};

export const createChart = async (chart: any) => {
  const charts = await fetchCharts();
  charts.push(chart);
  localStore.setItem('charts', charts);
  return charts;
};

export const deleteChart = async (chartId: string) => {
  const charts = await fetchCharts();
  const updatedCharts = charts.filter((chart: any) => chart.id !== chartId);
  localStore.setItem('charts', updatedCharts);
  return updatedCharts;
};

export const updateChart = async (chart: any) => {
  const charts = await fetchCharts();
  const updatedCharts = charts.map((c: any) => (c.id === chart.id ? chart : c));
  localStore.setItem('charts', updatedCharts);
  return updatedCharts;
};
