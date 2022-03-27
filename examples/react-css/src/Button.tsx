import React, { ReactNode } from 'react';
import './Button.css';

export interface ButtonProps {
  brand?: 'primary' | 'secondary';
  children?: ReactNode;
}

export function Button({ brand = 'secondary', children }: ButtonProps) {
  return <button className={'button button-' + brand}>{children}</button>;
}
