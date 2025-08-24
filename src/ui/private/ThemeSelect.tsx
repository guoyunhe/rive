import { BiMoon, BiSun, BiYinYang } from 'react-bootstrap-icons-pro';
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
          icon: <BiYinYang />,
        },
        {
          label: t('light'),
          value: 'light',
          icon: <BiSun />,
        },
        {
          label: t('dark'),
          value: 'dark',
          icon: <BiMoon />,
        },
      ]}
    />
  );
}
