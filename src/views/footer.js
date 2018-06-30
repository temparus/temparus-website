import m from 'mithril';
import marked from 'marked';
import { LanguageController, i18n } from '../models/language';
import LinkedInIcon from './images/linkedin.png';
import GitHubIcon from './images/github.png';
import GitLabIcon from './images/gitlab.svg';

class SocialLink {
  static view(vnode) {
    return m('a.social-link', { href: vnode.attrs.href, target: '_blank' }, [
      m('img', { src: vnode.attrs.icon }),
      m('span', vnode.attrs.label),
    ]);
  }
}

export default class Footer {
  static view() {
    return m(
      'footer.wrapper.dotted',
      m('div', [
        m('div.about', [m('h3', i18n('about.title')), m.trust(marked(i18n('about.text')))]),
        m('div.contact', [
          m(SocialLink, {
            label: 'linkedin.com/sandrolutz',
            href: 'https://linkedin.com/in/sandrolutz',
            icon: LinkedInIcon,
          }),
          m(SocialLink, {
            label: 'github.com/temparus',
            href: 'https://github.com/temparus',
            icon: GitHubIcon,
          }),
          m(SocialLink, {
            label: 'gitlab.com/temparus',
            href: 'https://gitlab.com/temparus',
            icon: GitLabIcon,
          }),
          m(SocialLink, {
            label: 'gitlab.ethz.ch/lutzsa',
            href: 'https://gitlab.ethz.ch/lutzsa',
            icon: GitLabIcon,
          }),
        ]),
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
