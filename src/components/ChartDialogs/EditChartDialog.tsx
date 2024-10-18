import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/components/Context/useApp';
import { LOAD_CHARTS, SET_SEARCH_OPEN } from '../Context/AppProvider';
import { ConfigureForm } from './ConfigureForm';
import { Chart } from '@/@types';
import { updateChart } from '@/services/charts.service';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';

export function EditChartDialog({ chart }: { chart: Chart }) {
  const { appDispatch } = useApp();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (data: Partial<Chart>) => {
    const newChart = await updateChart(data);
    appDispatch({
      type: LOAD_CHARTS,
      payload: newChart,
    });
    appDispatch({ type: SET_SEARCH_OPEN, payload: false });
    toast.success('Chart updated successfully');
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='absolute top-0 right-2 p-3 text-slate-700'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Edit2 className='w-4 h-4' size={16} />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Edit Chart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      {open && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='max-w-full break-words line-clamp-1'>
              Update Chart: {chart.title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            <ConfigureForm
              chart={chart}
              series={chart.series}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isEditMode
            />
          </div>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
