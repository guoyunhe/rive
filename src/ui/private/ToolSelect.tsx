import RcSelect, { SelectProps } from '@rc-component/select';
import './ToolSelect.css';

export function ToolSelect(props: SelectProps) {
  return <RcSelect prefixCls="rive-ui-select" {...props} />;
}
