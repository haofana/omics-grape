import { useAntdLocale } from '@/hooks/useAntdLocale';
import { locales } from '@/locales';

export function useI18n() {
  const { locale } = useAntdLocale();
  return locales[locale || 'zh-CN'];
}
