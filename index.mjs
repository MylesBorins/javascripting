import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const problem = require('./lib/problem')

var jsing = require('workshopper-adventure')({
  appDir: new URL('./', import.meta.url).pathname,
  languages: ['en'],
  header: require('workshopper-adventure/default/header'),
  footer: require('./lib/footer.js')
})

jsing.addAll(require('./menu.json').map(function (name) {
  return {
    name,
    fn: function () {
      var p = name.toLowerCase().replace(/\s/g, '-')
      var dir = require('path').join(__dirname, 'problems', p)
      return problem(dir)
    }
  }
}))

export default jsing;
