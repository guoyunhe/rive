import '@guoyunhe/prism-theme-github/github-light.css';
import { MDXProvider } from '@mdx-js/react';
import cn from 'classnames';
import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { CSSProperties, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Route, Router, Switch } from 'wouter';
import './DocUI.css';
import { Nav } from './private/Nav';
import { Toc } from './private/Toc';
import { components } from './private/components';
import { getRoutePath } from './private/getRoutePath';
import { DocLanguage, MDXDoc } from './types';

export interface DocUIProps {
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
   * React Router basename
   */
  basename?: string;
  /**
   * Supported languages
   */
  languages?: DocLanguage[];
  /**
   * Extra className.
   */
  className?: string;
  /**
   * Extra style.
   */
  style?: CSSProperties;
}

export function DocUI({ docs = [], basename = '/', languages = [], className, style }: DocUIProps) {
  const trimedBasename = basename?.endsWith('/')
    ? basename.substring(0, basename.length - 1)
    : basename;

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
            copy: 'Copy',
            success: 'Success',
            phone: 'Phone',
            tablet: 'Tablet',
            laptop: 'Laptop',
          },
        },
        zh: {
          translation: {
            copy: '复制',
            success: '成功',
            phone: '手机',
            tablet: '平板',
            laptop: '桌面',
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
      <div className={cn('rive-ui', className)} style={style}>
        <Router base={trimedBasename}>
          <Nav languages={languages} docs={docs} />
          <MDXProvider components={components}>
            <Switch>
              {docs.map((doc) => (
                <Route
                  key={doc.filepath}
                  path={getRoutePath(doc.filepath)}
                  children={
                    <>
                      <main className="rive-ui-main">
                        <doc.default />
                      </main>

                      {doc.tableOfContents && <Toc toc={doc.tableOfContents} />}
                    </>
                  }
                />
              ))}
            </Switch>
          </MDXProvider>
        </Router>
      </div>
    </I18nextProvider>
  );
}
