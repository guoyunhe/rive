import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Table.css';

export function Table(
  props: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>,
) {
  return (
    <div className="doc-ui-table">
      <table {...props} />
    </div>
  );
}
