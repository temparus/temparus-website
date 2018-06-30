import m from 'mithril';
import { LanguageController, i18n } from '../models/language';

export default class Footer {
  static view() {
    return m(
      'footer.wrapper.dotted',
      m('div', [
        m('div.about', [m('h3', i18n('about.title')), m('p', i18n('about.text'))]),
        m('div.contact', [m('h3', i18n('contact.title')), m('p', i18n('contact.text'))]),
        m('ul.copyright', [
          m('li', [m('span', `© ${new Date().getFullYear()} `), m('i.logo.light')]),
          m(
            'li',
            m(
              'a',
              { href: `/${LanguageController.language}/legal-notice`, oncreate: m.route.link },
              i18n('legal-notice')
            )
          ),
        ]),
      ])
    );
  }
}
