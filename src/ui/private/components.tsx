import { Children, ComponentType } from 'react';
import { Alert } from './Alert';
import { CodeBlock } from './CodeBlock';
import { CodeInline } from './CodeInline';
import { DemoBlock } from './DemoBlock';
import { Table } from './Table';

export const components: Record<string, ComponentType> = {
  code: CodeInline,
  pre: ({ children, ...props }: any) => {
    const codeElem = Children.only(children);
    const language = codeElem.props.className?.substring(9) || 'bash';
    const code = codeElem.props.children?.trim?.();
    return ['jsx', 'tsx'].includes(language) && !props.static ? (
      <DemoBlock language={language} code={code} {...props} />
    ) : (
      <CodeBlock language={language} code={code} {...props} />
    );
  },
  table: Table,
  Alert,
};
