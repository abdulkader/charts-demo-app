
export type Series = {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  group_popularity: number;
  notes: string;
};

export type Chart = {
  id: string;
  title: string;
  type: string;
  frequency: string;
  yAxisLabel: string;
  seriesId: string;
  series: Series;
  color: string;
  createdAt?: string;
  updatedAt?: string;
};
