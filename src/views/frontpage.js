import m from 'mithril';
import { i18n } from '../models/language';

export default class Frontpage {
  static view() {
    return m('div#frontpage-container', m('h2', i18n('This is the frontpage of temparus.ch')));
  }
}
