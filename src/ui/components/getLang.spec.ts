import { getLang } from './getLang';

describe('getLang()', () => {
  test('README.md => en', () => {
    expect(getLang('README.md')).toBe('en');
  });

  test('README.zh.md => zh', () => {
    expect(getLang('README.zh.md')).toBe('zh');
  });
});
