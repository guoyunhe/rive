import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './Button.css';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  color?: 'default' | 'success';
  size?: 'medium' | 'small';
}

export function Button({
  active,
  children,
  className,
  color = 'default',
  size = 'medium',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'rive-ui-button',
        `rive-ui-button-size-${size}`,
        `rive-ui-button-color-${color}`,
        active && `rive-ui-button-active`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
