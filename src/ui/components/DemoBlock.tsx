import cn from 'classnames';
import { CSSProperties, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Select } from '../Select';
import { CopyButton } from './CopyButton';
import './DemoBlock.css';
import { FileName } from './FileName';
import { Spacer } from './Spacer';
import { Toolbar } from './Toolbar';
import { transformCode } from './transformCode';

export interface DemoBlockProps {
  device?: 'laptop' | 'phone' | 'responsive';
  language?: 'jsx' | 'tsx';
  filename?: string | undefined;
  code: string;
  disablePadding?: boolean;
  className?: string;
  style?: CSSProperties;
  imports?: Record<string, any>;
}

export function DemoBlock({
  code,
  filename,
  language = 'jsx',
  device = 'responsive',
  disablePadding,
  className,
  style,
  imports = {},
}: DemoBlockProps) {
  const { t } = useTranslation();
  const deviceList = useMemo(
    () => [
      { value: 'phone', label: t('phone') },
      { value: 'laptop', label: t('laptop') },
    ],
    [t],
  );

  const [selectedDevice, setSelectedDevice] = useState<string>(
    device === 'responsive' ? 'laptop' : device,
  );

  return (
    <div
      className={cn('rive-ui-demo-block', `rive-ui-demo-block-${selectedDevice}`, className)}
      style={style}
    >
      <Toolbar>
        <FileName language={language} filename={filename} />
        <Spacer />
        {device === 'responsive' && (
          <Select
            size="small"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            options={deviceList}
          />
        )}
        <CopyButton code={code} />
      </Toolbar>
      <LiveProvider
        code={code}
        // disable the built-in theme of react-prism-renderer
        theme={{ plain: {}, styles: [] }}
        enableTypeScript={language === 'tsx'}
        transformCode={transformCode}
        scope={imports}
        noInline={code?.includes('render(')}
      >
        <div className="rive-ui-demo-block-main">
          <LivePreview
            className={cn(
              'rive-ui-demo-block-preview',
              disablePadding && 'rive-ui-demo-block-preview-disable-padding',
            )}
          />
          <div className="rive-ui-demo-block-develop">
            <LiveError className="rive-ui-demo-block-error" />
            <LiveEditor className="rive-ui-demo-block-editor" />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
