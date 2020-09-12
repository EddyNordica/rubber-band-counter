import { writable } from 'svelte/store';
import { getLocalStorage } from '../lib/BrowserStorage/browserStorage';

const StoredUIThemeKey = 'ui-theme';

export enum UITheme {
  Default = 'default',
  Light = 'light',
  Dark = 'dark',
};

const getUITheme = (): UITheme => {
  const storage = getLocalStorage();
  const storedTheme = storage.getItem(StoredUIThemeKey);

  if (storedTheme == null) {
    return UITheme.Default;
  } else {
    switch (storedTheme) {
      case 'light':
        return UITheme.Light;
      case 'dark':
        return UITheme.Dark;
      default:
        return UITheme.Default;
    }
  }
};

export const setUITheme = (theme: UITheme): void => {
  uiTheme.set(theme);
  
  const storage = getLocalStorage();

  if (theme === UITheme.Default) {
    storage.removeItem(StoredUIThemeKey);
  } else {
    storage.setItem(StoredUIThemeKey, theme);
  }

  document.body.classList.toggle('light-ui-theme', theme === UITheme.Light);
  document.body.classList.toggle('dark-ui-theme', theme === UITheme.Dark);
};


export const uiTheme = writable(getUITheme());
