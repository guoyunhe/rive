import { DocConfig } from './DocConfig.js';
import { TemplateType } from './TemplateType.js';

export interface Config {
  template: TemplateType;
  doc: DocConfig;
  packageJson: any;
  tsconfigJson: any;
}
