import { DocConfig } from './DocConfig';
import { LibConfig } from './LibConfig';
import { TemplateType } from './TemplateType';

export interface Config {
  template: TemplateType;
  lib: LibConfig;
  doc: DocConfig;
  packageJson: any;
  tsconfigJson: any;
}
