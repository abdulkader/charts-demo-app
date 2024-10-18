import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/components/Context/useApp';
import { LOAD_CHARTS, SET_SEARCH_OPEN } from '../Context/AppProvider';
import { ConfigureForm } from './ConfigureForm';
import { Chart, Series } from '@/@types';
import { createChart } from '@/services/charts.service';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { PlusCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

export function AddChartDialog({
  series,
  open,
  setOpen,
}: {
  series: Series;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { appDispatch } = useApp();
  const handleSubmit = async (data: Partial<Chart>) => {
    const id = nanoid();
    const newChart = await createChart({ ...data, id });
    appDispatch({
      type: LOAD_CHARTS,
      payload: newChart,
    });
    appDispatch({ type: SET_SEARCH_OPEN, payload: false });
    toast.success('Chart created successfully');
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className=' animate-in slide-in-from-bottom'
          type='button'
          onClick={() => setOpen(true)}>
          <PlusCircle className='w-4 h-4 mr-1' />
          Add New Chart
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Chart</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <ConfigureForm
            series={series}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
