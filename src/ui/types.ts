import type { Toc } from '@stefanprobst/rehype-extract-toc';
import type { ComponentType } from 'react';

export interface MDXDoc {
  default: ComponentType;
  /**
   * @see https://github.com/remcohaszing/recma-export-filepath
   */
  filepath: string;
  /**
   * @see https://github.com/remcohaszing/remark-mdx-frontmatter
   */
  frontmatter?: Record<string, any>;
  /**
   * @see https://github.com/remcohaszing/rehype-mdx-title
   */
  title?: string;
  /**
   * @see https://github.com/stefanprobst/rehype-extract-toc
   */
  tableOfContents?: Toc;
}

export interface DocLanguage {
  code: string;
  name: string;
}
