import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { Select } from '../Select';
import { DocLanguage } from '../types';
import { setLang } from './setLang';

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
    <Select
      value={i18n.language}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
      options={languages.map((item) => ({ label: item.name, value: item.code }))}
    />
  );
}
