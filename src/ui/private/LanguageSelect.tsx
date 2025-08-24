import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { DocLanguage } from '../types';
import { setLang } from './setLang';
import { ToolSelect } from './ToolSelect';

export interface LanguageSelectProps {
  languages?: DocLanguage[];
}

export function LanguageSelect({ languages = [] }: LanguageSelectProps) {
  const [location, navigate] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const newPath = setLang(location, i18n.language);
    if (newPath !== location) {
      navigate(newPath);
    }
  }, [i18n.language, location, navigate]);

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
