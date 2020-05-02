import {createRequire} from 'module';
import {join} from 'path';
import adventure from 'workshopper-adventure';

import header from 'workshopper-adventure/default/header.js'
import footer from './lib/footer.js';

import problem from  './lib/problem.mjs'

const require = createRequire(import.meta.url);
const dirname = new URL('./', import.meta.url).pathname;

const esmoduling = adventure({
  appDir: dirname,
  languages: ['en'],
  header,
  footer
});

esmoduling.addAll(require('./menu.json').map(function (name) {
  return {
    name,
    fn: function () {
      var p = name.toLowerCase().replace(/\s/g, '-')
      var dir = join(dirname, 'problems', p)
      return problem(dir)
    }
  }
}))

export default esmoduling;
