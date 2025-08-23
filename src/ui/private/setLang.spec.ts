import { setLang } from './setLang';

describe('setLang()', () => {
  test('(/, zh) => /zh/', () => {
    expect(setLang('/', 'zh')).toBe('/zh/');
  });

  test('(/zh, fr) => /fr/', () => {
    expect(setLang('/zh', 'fr')).toBe('/fr/');
  });

  test('(/zh/, en) => /', () => {
    expect(setLang('/zh/', 'en')).toBe('/');
  });

  test('(/zh/changelog/, fr) => /fr/changelog/', () => {
    expect(setLang('/zh/changelog/', 'fr')).toBe('/fr/changelog/');
  });

  test('(/zh-CN/, en) => /', () => {
    expect(setLang('/zh-CN/', 'en')).toBe('/');
  });
});
