import { ComponentType } from 'react';

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
}

export interface DocLanguage {
  code: string;
  name: string;
}
