import { Chart } from '@/@types';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { deleteChart } from '@/services/charts.service';
import { LOAD_CHARTS } from '@/components/Context/AppProvider';
import { useApp } from '@/components/Context/useApp';
import { toast } from 'sonner';

export function DeleteDialog({ chart }: { chart: Chart }) {
  const { appDispatch } = useApp();
  const confirmDelete = async () => {
    const newlist = await deleteChart(chart.id);
    toast.success('Chart deleted');
    appDispatch({ type: LOAD_CHARTS, payload: newlist });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className='absolute top-0 right-8 p-3 text-red-500'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trash2 className='w-4 h-4' size={16} />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Delete Chart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this chart?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            chart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={confirmDelete} variant='destructive' type='button'>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
