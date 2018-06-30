import m from 'mithril';
import { i18n } from '../models/language';

export default class ServicePage {
  static view() {
    return m('div#frontpage-container', m('h2', i18n('Services!')));
  }
}
