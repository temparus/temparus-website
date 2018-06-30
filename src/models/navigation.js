import m from 'mithril';
import { LanguageController } from './language';

/**
 * Navigation model to store the current state of the main navigation.
 *
 * @return {Navigation} Navigation state model
 */
class Navigation {
  constructor(items) {
    this._items = items.map(item => {
      const newItem = Object.assign({}, item);
      if (newItem.addLanguagePrefix) {
        newItem.getLink = addLanguagePrefix => Navigation._getLink(newItem.path, addLanguagePrefix);
      } else {
        newItem.getLink = () => newItem.path;
      }
      return newItem;
    });
  }

  get items() {
    return this._items;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  get selectedItem() {
    return this._selectedIndex >= 0 ? this._items[this._selectedIndex] : undefined;
  }

  map(callback) {
    return this._items.map(callback);
  }

  onupdate() {
    this._selectedIndex = this._checkMenuItemSelection();
  }

  static _getLink(path, addLanguagePrefix = true) {
    if (addLanguagePrefix) {
      return `/${LanguageController.language}${path}`;
    }
    return path;
  }

  _checkMenuItemSelection() {
    let selectedIndex;
    this._items.forEach((item, index) => {
      const link = item.getLink(false);

      if (
        (link.length <= 4 && m.route.get().length <= 4) ||
        (link.length > 4 && m.route.get().includes(link))
      ) {
        selectedIndex = index;
      }
    });
    this._selectedIndex = selectedIndex;
    return this._selectedIndex;
  }
}

export const mainNavigation = new Navigation([
  {
    label: 'Home',
    path: '/',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Service',
    path: '/service',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Software',
    path: '/software',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Model Making',
    path: '/model-making',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
  {
    label: 'Electronics',
    path: '/electronics',
    addLanguagePrefix: true,
    onupdate: m.route.link,
  },
]);
