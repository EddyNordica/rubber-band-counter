import { uiTheme } from './stores/theming';
import { getLocalStorage } from '../lib/Storage/browserStorage';

const AppVersionKey = 'version';

export const init = () => {
  const storage = getLocalStorage();
  storage.setItem(AppVersionKey, '1.0.0');

  // Load the UI theme.
  const unsubscribe = uiTheme.subscribe((c) => {});

  return () => {
    unsubscribe();
  };
};
