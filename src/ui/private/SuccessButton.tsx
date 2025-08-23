import { BiCheckCircle } from 'react-bootstrap-icons-pro';
import { useTranslation } from 'react-i18next';
import { ToolButton } from './ToolButton';

export function SuccessButton() {
  const { t } = useTranslation();
  return (
    <ToolButton color="success" icon={<BiCheckCircle />}>
      {t('success')}
    </ToolButton>
  );
}
