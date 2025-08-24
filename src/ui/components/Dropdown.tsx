import RcDropdown, { DropdownProps } from '@rc-component/dropdown';
import './Dropdown.css';

export function Dropdown(props: DropdownProps) {
  return <RcDropdown prefixCls="rive-ui-dropdown" {...props} />;
}
