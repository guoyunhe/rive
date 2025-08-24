import cn from 'classnames';
import { CSSProperties, ReactNode, useState } from 'react';
import { ToolButton } from './ToolButton';
import './ToolSelect.css';

export interface ToolSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; icon?: ReactNode }>;
  className?: string;
  style?: CSSProperties;
}

export function ToolSelect({ value, onChange, options, className, style }: ToolSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((item) => item.value === value);
  return (
    <div className={cn('rive-ui-select', className)} style={style}>
      <ToolButton icon={selected?.icon} onClick={() => setOpen((prev) => !prev)}>
        {selected?.label}
      </ToolButton>
      <div className={cn('rive-ui-select-dropdown', open && 'rive-ui-select-dropdown-open')}>
        {options.map((item) => (
          <ToolButton
            key={item.value}
            icon={item.icon}
            onClick={() => {
              onChange(item.value);
              setOpen(false);
            }}
          >
            {item.label}
          </ToolButton>
        ))}
      </div>
    </div>
  );
}
