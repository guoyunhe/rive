import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './Button.css';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  color?: string;
}

export function Button({ children, active, color, className, ...rest }: ButtonProps) {
  return (
    <button
      className={classNames(
        'rive-ui-button',
        color && `rive-ui-button-${color}`,
        active && `rive-ui-button-active`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
