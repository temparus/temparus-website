import i18n_static from 'i18n4v';
import LanguageController from './LanguageController';
import german from '../../languages/de.json';
import english from '../../languages/en.json';

const languages = {
  en: english,
  de: german,
};
const defaultLanguageCode = 'en';
const languageController = new LanguageController(languages, defaultLanguageCode);

/**
 * Use this function to translate static texts using i18n4v and
 * load localized values from dynamic objects (e.g. { en: 'Hello', de: 'Hallo' })
 */
function i18n(value, options = {}) {
  if (typeof value === 'string') {
    return i18n_static(value, options);
  }

  if (value[languageController.language]) {
    return value[languageController];
  }
  if (value[defaultLanguageCode]) {
    return value[defaultLanguageCode];
  }
  return value[Object.keys(value)[0]];
}

export { i18n, languageController as LanguageController };
