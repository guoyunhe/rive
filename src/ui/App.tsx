import { useLocalStorage } from '@guoyunhe/react-storage';
import { MDXProvider } from '@mdx-js/react';
import cn from 'classnames';
import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { CSSProperties, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Redirect, Route, Router, Switch } from 'wouter';
import './App.css';
import { Nav } from './components/Nav';
import { Toc } from './components/Toc';
import { components } from './components/components';
import { getRoutePath } from './components/getRoutePath';
import './github.css';
import { DocLanguage, MDXDoc } from './types';

export interface DocUIProps {
  /**
   * Package author. Extracted from package.json. */
  author?: string;
  /**
   * React Router basename
   */
  basename?: string;
  /**
   * Extra className.
   */
  className?: string;
  /**
   * Imported Markdown/MDX files. For example:
   *
   * ```jsx
   * import * as readme from './README.md';
   * import * as changelog from './CHANGELOG.md';
   *
   * <DocUI docs={[ readme, changelog ]} />
   * ```
   */
  docs?: MDXDoc[];
  /**
   * Supported languages
   */
  languages?: DocLanguage[];
  /**
   * Extra style.
   */
  style?: CSSProperties;
}

export function DocUI({
  author,
  docs = [],
  basename = '/',
  languages = [],
  className,
  style,
}: DocUIProps) {
  const trimedBasename = basename?.endsWith('/')
    ? basename.substring(0, basename.length - 1)
    : basename;

  const [theme, setTheme] = useLocalStorage(`${trimedBasename}/theme`, 'light');

  const i18n = useMemo(() => {
    const i18n_ = createInstance({
      fallbackLng: 'en',
      supportedLngs: languages?.map((lang) => lang.code) || ['en'],

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },

      resources: {
        en: {
          translation: {
            copy: '📋 Copy',
            success: '✅ Success',
            phone: '📱 Phone',
            laptop: '💻 Laptop',
            light: '☀️ Light',
            dark: '🌛 Dark',
          },
        },
        zh: {
          translation: {
            copy: '📋 复制',
            success: '✅ 成功',
            phone: '📱 手机',
            laptop: '💻 桌面',
            light: '☀️ 亮色',
            dark: '🌛 暗色',
          },
        },
      },

      detection: {
        lookupLocalStorage: `${trimedBasename}/locale`,
        caches: ['localStorage'],
      },
    });
    i18n_.use(LanguageDetector);
    i18n_.init();
    return i18n_;
  }, [languages, trimedBasename]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={cn('rive-ui-app', `rive-ui-app-theme-${theme}`, className)} style={style}>
        <Router base={trimedBasename}>
          <Nav
            languages={languages}
            docs={docs}
            theme={theme}
            setTheme={setTheme}
            author={author}
          />
          <MDXProvider components={components}>
            <Switch>
              {docs.map((doc) => (
                <Route key={doc.filepath} path={getRoutePath(doc.filepath)}>
                  <main className="rive-ui-main">
                    <doc.default />
                  </main>

                  {doc.tableOfContents && <Toc toc={doc.tableOfContents} />}
                </Route>
              ))}
              <Route>
                <Redirect href={i18n.language === 'en' ? '/' : `/${i18n.language}`} />
              </Route>
            </Switch>
          </MDXProvider>
        </Router>
      </div>
    </I18nextProvider>
  );
}
