import cn from 'classnames';
import { Highlight, Language } from 'prism-react-renderer';
import { CSSProperties } from 'react';
import './CodeBlock.css';
import { CopyButton } from './CopyButton';
import { FileName } from './FileName';
import { Spacer } from './Spacer';
import { Toolbar } from './Toobar';

export interface CodeBlockProps {
  code?: string;
  children?: string;
  filename?: string;
  language?: string;
  className?: string;
  style?: CSSProperties;
}

export function CodeBlock({
  code,
  children,
  filename,
  language = 'bash',
  className,
}: CodeBlockProps) {
  return (
    <div className={cn('doc-ui-code-block', className)}>
      <Toolbar>
        <FileName language={language} filename={filename} />
        <Spacer />
        <CopyButton code={code} />
      </Toolbar>
      <Highlight
        theme={{ plain: {}, styles: [] }}
        code={code || children || ''}
        language={language as Language}
      >
        {({ tokens, getLineProps, getTokenProps, ...rest }) => (
          <pre {...rest}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
