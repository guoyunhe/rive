import { DocConfig } from './DocConfig.js';
import { LibConfig } from './LibConfig.js';
import { TemplateType } from './TemplateType.js';

export interface Config {
  template: TemplateType;
  lib: LibConfig;
  doc: DocConfig;
  packageJson: any;
  tsconfigJson: any;
}
