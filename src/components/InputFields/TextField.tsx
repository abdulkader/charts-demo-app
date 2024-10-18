import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, type = 'text', error, ...props }, ref) => {
    return (
      <div className='block w-full pb-4'>
        <label
          htmlFor={id || name}
          className='block text-xs font-medium text-[var(--foreground)]'>
          {label}
        </label>
        <input
          type={type}
          id={id || name}
          name={name}
          className={cn(
            'mt-1 w-full rounded-md shadow-sm p-1 border h-10 bg-[var(--background)] text-[var(--foreground)]',
            error ? 'border-red-500' : 'border-slate-200 dark:border-primary/20',
          )}
          ref={ref}
          {...props}
        />
        {error && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
