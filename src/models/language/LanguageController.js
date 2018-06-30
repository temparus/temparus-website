import i18n from 'i18n4v';

export default class LanguageController {
  constructor(languages, defaultLanguageCode) {
    this._languages = languages;
    this._defaultLanguageCode = defaultLanguageCode;

    const savedLanguage = localStorage.getItem('language');

    if (this.isValidLanguage(savedLanguage)) {
      this.language = savedLanguage;
    } else {
      this.language = this._chooseLanguageFromHeader();
    }
  }

  _chooseLanguageFromHeader() {
    let languagePreference;
    let language;

    if (navigator.languages !== undefined) {
      languagePreference = navigator.languages;
    } else {
      languagePreference = [navigator.language];
    }
    languagePreference.forEach(item => {
      if (!language && this.isValidLanguage(item)) {
        language = item;
      }
    });
    return language || this._defaultLanguageCode;
  }

  set language(twoLetterCode) {
    if (!this._languages[twoLetterCode]) {
      throw new Error(`Invalid language code "${twoLetterCode}"`);
    }
    i18n.translator.reset();
    i18n.translator.add(this._languages[twoLetterCode]);
    this._currentLanguageCode = twoLetterCode;
    localStorage.setItem('language', this._currentLanguageCode);
  }

  get language() {
    return this._currentLanguageCode;
  }

  get languageList() {
    return Object.keys(this._languages);
  }

  isValidLanguage(twoLetterCode) {
    if (this._languages[twoLetterCode]) {
      return true;
    }
    return false;
  }
}
