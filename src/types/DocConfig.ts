import { DocLanguage } from './DocLanguage';

export interface DocConfig {
  /** Skip doc building */
  disabled?: boolean;

  /** URL basename for Vite and React Router */
  basename: string;

  /** Title */
  title: string;

  /** Supported languages */
  languages?: DocLanguage[];
}
