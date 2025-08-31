import cn from 'classnames';
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import './Select.css';

export interface SelectProps
  extends Omit<
    DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    'size'
  > {
  options: Array<{ value: string; label: string }>;
  size?: 'medium' | 'small';
}

export function Select({ className, options, size, ...rest }: SelectProps) {
  return (
    <select className={cn('rive-ui-select', `rive-ui-select-size-${size}`, className)} {...rest}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
