import { createStore, LocalStorageStore } from './createStore';
import { UITheme } from '../consts/UITheme';
import { DefaultAppSettings } from '../consts/DefaultAppSettings';

class ThemingLocalStorageStore extends LocalStorageStore<UITheme> {
  public write(value: UITheme) {
    if (value === UITheme.Default) {
      this.storage.removeItem(this.key);
    } else {
      this.storage.setItem(this.key, value);
    }

    document.body.classList.toggle('light-ui-theme', value === UITheme.Light);
    document.body.classList.toggle('dark-ui-theme', value === UITheme.Dark);
  }
}

const createUITheme = () => {
  const { subscribe, set, reset } = createStore(
    'ui-theme',
    {
      defaultValue: DefaultAppSettings.uiTheme,
      parser: (value: string) => {
        switch (value) {
          case 'light':
            return UITheme.Light;
          case 'dark':
            return UITheme.Dark;
          default:
            return UITheme.Default;
        }
      },
    },
    ThemingLocalStorageStore
  );

  return {
    subscribe,
    set,
    reset,
  };
};

export const uiTheme = createUITheme();
