import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { DocLanguage, MDXDoc } from '../types';
import { getLang } from './getLang';
import { getRoutePath } from './getRoutePath';
import { LanguageSelect } from './LanguageSelect';
import './Nav.css';
import { ThemeSelect } from './ThemeSelect';

const date = new Date();
const year = date.getFullYear();

export interface NavProps {
  docs: MDXDoc[];
  languages?: DocLanguage[];
  author?: string | undefined;
  theme: string;
  setTheme: (theme: string) => void;
}

export function Nav({ docs, languages, author, theme, setTheme }: NavProps) {
  const { i18n } = useTranslation();

  const docsFilteredByLang = docs
    .filter((doc) => getLang(doc.filepath) === i18n.language)
    .map((doc) => ({
      title: doc.title,
      path: getRoutePath(doc.filepath),
      group: doc.frontmatter?.['group'],
      order: doc.frontmatter?.['order'],
    }))
    .sort((a, b) => {
      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order;
      } else if (typeof a.order === 'number') {
        return -1;
      } else if (typeof b.order === 'number') {
        return 1;
      } else {
        return a.path.localeCompare(b.path);
      }
    });
  const groups: string[] = [];

  docsFilteredByLang.forEach((doc) => {
    if (doc.group && !groups.includes(doc.group)) {
      groups.push(doc.group);
    }
  });

  return (
    <aside className="rive-ui-nav">
      <nav className="rive-ui-nav-inner">
        <div className="rive-ui-nav-menu">
          {docsFilteredByLang
            .filter((doc) => !doc.group)
            .map((doc) => (
              <Link
                key={doc.path}
                className={(active) => (active ? 'rive-ui-nav-item active' : 'rive-ui-nav-item')}
                to={getRoutePath(doc.path)}
              >
                {doc.title}
              </Link>
            ))}

          {groups.map((group) => (
            <div key={group} className="rive-ui-nav-group">
              <div className="rive-ui-nav-group-title">{group}</div>
              {docsFilteredByLang
                .filter((doc) => group === doc.group)
                .map((doc) => (
                  <Link
                    key={doc.path}
                    className={(active) =>
                      active ? 'rive-ui-nav-item active' : 'rive-ui-nav-item'
                    }
                    to={getRoutePath(doc.path)}
                  >
                    {doc.title}
                  </Link>
                ))}
            </div>
          ))}
        </div>

        <div className="rive-ui-nav-footer">
          <div className="rive-ui-settings">
            {languages && <LanguageSelect languages={languages} />}

            <ThemeSelect theme={theme} setTheme={setTheme} />
          </div>

          <div className="rive-ui-copyright">
            &copy; {year} {author}
          </div>
        </div>
      </nav>
    </aside>
  );
}
