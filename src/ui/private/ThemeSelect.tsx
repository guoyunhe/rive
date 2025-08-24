import { useTranslation } from 'react-i18next';
import { ToolSelect } from './ToolSelect';

export interface ThemeSelectProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function ThemeSelect({ theme, setTheme }: ThemeSelectProps) {
  const { t } = useTranslation();

  return (
    <ToolSelect
      value={theme}
      onChange={(value) => {
        setTheme(value);
      }}
      options={[
        {
          label: t('auto'),
          value: 'auto',
        },
        {
          label: t('light'),
          value: 'light',
        },
        {
          label: t('dark'),
          value: 'dark',
        },
      ]}
    />
  );
}
