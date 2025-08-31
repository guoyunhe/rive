import { BiCheckCircle } from 'react-bootstrap-icons-pro';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';

export function SuccessButton() {
  const { t } = useTranslation();
  return (
    <Button color="success">
      <BiCheckCircle />
      {t('success')}
    </Button>
  );
}
