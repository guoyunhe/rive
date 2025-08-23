import cn from 'classnames';
import { CSSProperties, useMemo, useState } from 'react';
import { BiLaptop, BiPhone, BiTablet } from 'react-bootstrap-icons-pro';
import { useTranslation } from 'react-i18next';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { CopyButton } from './CopyButton';
import './DemoBlock.css';
import { FileName } from './FileName';
import { Spacer } from './Spacer';
import { Toolbar } from './Toobar';
import { ToolButton } from './ToolButton';
import { ToolSelect } from './ToolSelect';
import { transformCode } from './transformCode';

export interface DemoBlockProps {
  device?: 'laptop' | 'tablet' | 'phone' | 'responsive';
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
  imports,
}: DemoBlockProps) {
  const { t } = useTranslation();
  const deviceList = useMemo(
    () => [
      { value: 'phone', label: t('phone'), icon: <BiPhone /> },
      { value: 'tablet', label: t('tablet'), icon: <BiTablet /> },
      { value: 'laptop', label: t('laptop'), icon: <BiLaptop /> },
    ],
    [t],
  );

  const [selectedDevice, setSelectedDevice] = useState<string>(
    device === 'responsive' ? 'laptop' : device,
  );

  const selectedDeviceObj = useMemo(
    () => deviceList.find((item) => item.value === selectedDevice),
    [selectedDevice, deviceList],
  );

  return (
    <div
      className={cn('doc-ui-demo-block', `doc-ui-demo-block-${selectedDevice}`, className)}
      style={style}
    >
      <Toolbar>
        <FileName language={language} filename={filename} />
        <Spacer />
        {device === 'responsive' ? (
          <ToolSelect value={selectedDevice} onChange={setSelectedDevice} options={deviceList} />
        ) : (
          <ToolButton icon={selectedDeviceObj?.icon}>{selectedDeviceObj?.label}</ToolButton>
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
        <div className="doc-ui-demo-block-main">
          <LivePreview
            className={cn(
              'doc-ui-demo-block-preview',
              disablePadding && 'doc-ui-demo-block-preview-disable-padding',
            )}
          />
          <div className="doc-ui-demo-block-develop">
            <LiveError className="doc-ui-demo-block-error" />
            <LiveEditor className="doc-ui-demo-block-editor" />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
