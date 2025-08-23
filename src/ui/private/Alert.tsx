import cn from 'classnames';
import { ReactNode, useMemo } from 'react';
import {
  BiCheckCircle,
  BiExclamationCircle,
  BiInfoCircle,
  BiXCircle,
} from 'react-bootstrap-icons-pro';
import './Alert.css';

export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  children?: ReactNode;
}

export function Alert({ type = 'info', children }: AlertProps) {
  const icon: ReactNode = useMemo(() => {
    switch (type) {
      case 'error':
        return <BiXCircle />;
      case 'success':
        return <BiCheckCircle />;
      case 'warning':
        return <BiExclamationCircle />;
      default:
        return <BiInfoCircle />;
    }
  }, [type]);
  return (
    <div className={cn('doc-ui-alert', `doc-ui-alert-${type}`)}>
      <div className="doc-ui-alert-icon">{icon}</div>
      <div className="doc-ui-alert-main">{children}</div>
    </div>
  );
}
