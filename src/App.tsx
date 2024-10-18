import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/components/Context/ThemeProvider';
import { Header } from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/components/Context/AppProvider';
import Homepage from '@/pages/Home';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
        <AppProvider>
          <Header />
          <div className='min-h-screen'>
            <Homepage />
          </div>
          <Toaster position='bottom-center' />
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
