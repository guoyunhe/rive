import { useEffect, useState } from 'react';
import { BiCopy } from 'react-bootstrap-icons-pro';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { SuccessButton } from './SuccessButton';

export interface CopyButtonProps {
  code?: string | undefined;
}

export function CopyButton({ code }: CopyButtonProps) {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer = 0;
    if (success) {
      timer = window.setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
    return () => {
      window.clearTimeout(timer);
    };
  }, [success]);

  if (success) {
    return <SuccessButton />;
  }

  return (
    <Button
      onClick={() => {
        navigator.clipboard
          .writeText(code || '')
          .then(() => {
            setSuccess(true);
          })
          .catch();
      }}
    >
      <BiCopy />
      {t('copy')}
    </Button>
  );
}
