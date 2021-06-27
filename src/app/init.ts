import { uiTheme } from '../db/theming';
import { setVersion, CurrentVersion } from './version';

export const init = () => {
  setVersion(CurrentVersion);

  // Load the UI theme.
  const unsubscribe = uiTheme.subscribe((c) => {});

  return () => {
    unsubscribe();
  };
};
