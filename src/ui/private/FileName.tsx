import cn from 'classnames';
import './FileName.css';

export interface FileNameProps {
  filename: string | undefined;
  language: string | undefined;
}

export function FileName({ language, filename }: FileNameProps) {
  return (
    <span className="doc-ui-file-name">
      {language && (
        <span className={cn('doc-ui-file-name-icon', `doc-ui-file-name-icon-${language}`)}>
          {language === 'bash' ? '>_' : language}
        </span>
      )}
      <span className="doc-ui-file-name-text">{filename}</span>
    </span>
  );
}
