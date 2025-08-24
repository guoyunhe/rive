import { useTranslation } from 'react-i18next';
import { DocLanguage } from '../types';
import { ToolSelect } from './ToolSelect';

export interface LanguageSelectProps {
  languages?: DocLanguage[];
}

export function LanguageSelect({ languages = [] }: LanguageSelectProps) {
  const { i18n } = useTranslation();

  return (
    <ToolSelect
      value={i18n.language}
      onChange={(value) => {
        i18n.changeLanguage(value);
      }}
      options={languages.map((item) => ({ label: item.name, value: item.code }))}
    />
  );
}
