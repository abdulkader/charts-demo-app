import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, name, error, options, ...props }, ref) => {
    return (
      <div className='block w-full pb-4'>
        <label
          htmlFor={id || name}
          className='block text-xs font-medium text-[var(--foreground)]'>
          {label}
        </label>
        <select
          id={id || name}
          name={name}
          className={cn(
            'mt-1 w-full rounded-md shadow-sm p-1 border h-10 bg-[var(--background)] text-[var(--foreground)]',
            error ? 'border-red-500' : 'border-slate-200 dark:border-primary/20',
          )}
          ref={ref}
          {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';
