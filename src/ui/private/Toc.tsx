import type { Toc as TocType } from '@stefanprobst/rehype-extract-toc';
import './Toc.css';
import { TocList } from './TocList';

export interface TocProps {
  toc: TocType;
}

export function Toc({ toc }: TocProps) {
  return (
    <aside className="rive-ui-toc">
      <nav className="rive-ui-toc-inner">
        <TocList toc={toc} />
      </nav>
    </aside>
  );
}
