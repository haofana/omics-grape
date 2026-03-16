import { useContext } from 'react';
import { ConfigContext } from 'antd/es/config-provider';

export function useAntdLocale() {
  const config = useContext(ConfigContext);
  return {
    locale: config?.locale?.locale,
    localeData: config?.locale, // 完整语言包
    direction: config?.direction, // 方向
  };
}
