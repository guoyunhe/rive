import { useTranslation } from 'react-i18next';
import { Select } from '../Select';

export interface ThemeSelectProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function ThemeSelect({ theme, setTheme }: ThemeSelectProps) {
  const { t } = useTranslation();

  return (
    <Select
      value={theme}
      onChange={(e) => {
        setTheme(e.target.value);
      }}
      options={[
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
