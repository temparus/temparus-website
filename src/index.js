// src/index.js
import m from 'mithril';
import { LanguageController } from './models/language';
import ServicePage from './views/service';
import frontpage from './views/frontpage';
import layout from './views/layout';
import { Error404 } from './views/errors';
import './views/styles/base.less';

// set to pathname strategy (Please note that the production server needs to support this)
m.route.prefix('');

const routes = [
  {
    url: '/:language/',
    view: () => m(frontpage),
  },
  {
    url: '/:language/service',
    view: () => m(ServicePage),
  },
];

function onmatch(args, route) {
  if (LanguageController.isValidLanguage(args.language)) {
    LanguageController.language = args.language;
    return { view: vnode => m(layout, route.view(vnode)) };
  }
  return {
    view() {
      return m(layout, m(Error404));
    },
  };
}

function generateRoutes() {
  const result = {
    '/': {
      onmatch() {
        m.route.set(`/${LanguageController.language}/`);
      },
    },
  };

  routes.forEach(r => {
    result[r.url] = {
      onmatch: args => onmatch(args, r),
    };
  });

  result['/:language/:404...'] = {
    onmatch: args =>
      onmatch(args, {
        view() {
          return m(Error404);
        },
      }),
  };
  m.route(document.body, '/', result);
}

generateRoutes();
