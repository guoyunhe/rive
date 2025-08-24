import { getRoutePath } from './getRoutePath';

describe('getRoutePath()', () => {
  test('README.md => /', () => {
    expect(getRoutePath('README.md')).toBe('/');
  });

  test('README.zh.md => /zh/', () => {
    expect(getRoutePath('README.zh.md')).toBe('/zh/');
  });

  test('CHANGELOG.md => /changelog/', () => {
    expect(getRoutePath('CHANGELOG.md')).toBe('/changelog/');
  });

  test('CHANGELOG.zh.md => /zh/changelog/', () => {
    expect(getRoutePath('CHANGELOG.zh.md')).toBe('/zh/changelog/');
  });
});
