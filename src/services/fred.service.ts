import { api } from './api.service';

export const searchSeries = async (search_text: string) => {
  const response = await api.get(
    `/series/search?search_text=${encodeURIComponent(search_text)}`,
  );
  return response.data;
};

export const fetchSeriesObservations = async (
  series_id: string,
  frequency: string,
) => {
  const response = await api.get(
    `/series/observations?series_id=${encodeURIComponent(
      series_id,
    )}&frequency=${encodeURIComponent(frequency)}`,
  );
  return response.data;
};
