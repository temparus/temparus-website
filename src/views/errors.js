import m from 'mithril';
import { i18n } from '../models/language';

/**
 * View to show when a page does not exist.
 * This view should replace the whole page content!
 *
 * @return {Error404}
 */
export class Error404 {
  static view() {
    return m('div.error', [m('h1', i18n('error404.title')), m('p', i18n('error404.text'))]);
  }
}
