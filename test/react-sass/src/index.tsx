import React, { ReactNode } from 'react';

export interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
