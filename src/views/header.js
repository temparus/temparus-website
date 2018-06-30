import m from 'mithril';
import { i18n, LanguageController } from '../models/language';
import MobileMenuButton from './images/mobileMenuButton.svg';
import { mainNavigation } from '../models/navigation';

export default class Header {
  oninit() {
    this._mobileMenuShowing = false;
  }

  view() {
    mainNavigation.onupdate();
    return m('header', [
      m('div', [
        m(
          'h1',
          m('a.logo', {
            href: `/${LanguageController.language}/`,
            oncreate: m.route.link,
          })
        ),
        this.constructor._languageSwitcher,
        m(
          'div.mobile-menu',
          {
            onclick: () => {
              this._mobileMenuShowing = !this._mobileMenuShowing;
            },
          },
          m('img', { src: MobileMenuButton, alt: i18n('Menu') })
        ),
      ]),
      m('nav', this.constructor._mainMenu),
    ]);
  }

  static get _languageSwitcher() {
    return m(
      'ul.language-selector',
      LanguageController.languageList.map(language => {
        const abbreviation = m(
          'abbr',
          { lang: language, title: i18n(`language.abbreviation.${language}`) },
          language.toUpperCase()
        );
        if (LanguageController.language === language) {
          return m('li', abbreviation);
        }
        return m(
          'li',
          m(
            'a',
            {
              rel: 'alternative',
              hreflang: language,
              href: `/${language}${m.route.get().substring(3)}`,
              oncreate: m.route.link,
            },
            abbreviation
          )
        );
      })
    );
  }

  static get _mainMenu() {
    return m(
      'ul.mainmenu',
      mainNavigation.map((item, index) =>
        m(
          'li',
          {
            class: mainNavigation.selectedIndex === index ? 'active' : '',
          },
          [
            m(
              'a',
              {
                href: item.getLink(),
                // onclick: e => {
                //   e.preventDefault();
                //   m.route.set(item.getLink());
                //   m.redraw();
                // },
                oncreate: m.route.link,
              },
              i18n(item.label)
            ),
          ]
        )
      )
    );
  }
}
