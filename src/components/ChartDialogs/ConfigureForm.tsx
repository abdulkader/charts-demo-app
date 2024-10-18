import { Chart, Series } from '@/@types';
import { SelectField } from '@/components/InputFields/SelectField';
import { TextField } from '@/components/InputFields/TextField';
import { CHART_TYPES } from '@/lib/constants';
import { getFrequencyOptions } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';

export interface ConfigureFormProps {
  chart?: Chart;
  series: Series;
  onSubmit: (data: Partial<Chart>) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

export function ConfigureForm({
  chart,
  series,
  onSubmit,
  onCancel,
  isEditMode = false,
}: ConfigureFormProps) {
  const schema = yup
    .object({
      id: isEditMode
        ? yup.string().required('ID is required')
        : yup.string().optional(),
      seriesId: yup.string().required('Series is required'),
      type: yup.string().required('Chart type is required'),
      title: yup.string().required('Chart title is required'),
      yAxisLabel: yup.string().required('Y-Axis label is required'),
      frequency: yup.string().required('Frequency is required'),
      color: yup
        .string()
        .optional()
        .matches(/^#([0-9A-Fa-f]{6})$/, 'Invalid color'),
    })
    .required();
  const defaultValues = {
    id: chart?.id || '',
    seriesId: chart?.seriesId || series.id,
    type: chart?.type || CHART_TYPES[0].value,
    title: chart?.title || '',
    yAxisLabel: chart?.yAxisLabel || '',
    frequency: chart?.frequency || series.frequency_short?.toLowerCase(),
    color: chart?.color || '#FF9D3D',
  };

  const formSubmit = (data: Partial<Chart>) => {
    onSubmit({ ...data, series });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <input type='hidden' value={chart?.id} {...register('id')} />
      <input
        type='hidden'
        value={chart?.seriesId || series.id}
        {...register('seriesId')}
      />
      <TextField
        label='Series ID'
        {...register('seriesId')}
        readOnly
        error={errors.seriesId?.message}
      />
      <SelectField
        label='Chart Type'
        options={CHART_TYPES}
        defaultValue={chart?.type}
        {...register('type')}
        error={errors.type?.message}
      />
      <TextField
        label='Chart Title'
        defaultValue={chart?.title || ''}
        {...register('title')}
        error={errors.title?.message}
      />
      <TextField
        label='Y-Axis Label'
        defaultValue={chart?.yAxisLabel || ''}
        {...register('yAxisLabel')}
        error={errors.yAxisLabel?.message}
      />
      <TextField
        label='Chart Color'
        type='color'
        defaultValue={chart?.color || '#FF9D3D'}
        {...register('color')}
        error={errors.color?.message}
      />
      <SelectField
        label='Frequency'
        options={getFrequencyOptions(series.frequency_short)}
        defaultValue={chart?.frequency || series.frequency_short?.toLowerCase()}
        {...register('frequency')}
        error={errors.frequency?.message}
      />
      <div className='flex justify-end gap-2'>
        <Button type='button' onClick={onCancel} variant='outline'>
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading || isSubmitting}>
          {isLoading || isSubmitting ? (
            <Loader size='25px' />
          ) : isEditMode ? (
            'Update'
          ) : (
            'Create'
          )}
        </Button>
      </div>
    </form>
  );
}
