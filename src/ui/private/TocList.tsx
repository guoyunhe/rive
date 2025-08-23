import type { Toc as TocType } from '@stefanprobst/rehype-extract-toc';
import './TocList.css';

export interface TocListProps {
  toc: TocType;
}

export function TocList({ toc }: TocListProps) {
  return (
    <div className="rive-ui-toc-list">
      {toc.map((tocItem) => (
        <div className="rive-ui-toc-item">
          <a className="rive-ui-toc-link" href={`#${tocItem.id}`}>
            {tocItem.value}
          </a>
          {tocItem.children && <TocList toc={tocItem.children} />}
        </div>
      ))}
    </div>
  );
}
