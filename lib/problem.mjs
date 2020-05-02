/* eslint-disable standard/no-callback-literal */

import {join, resolve, sep} from 'path';
import getFile from './get-file.js';
import compare from './compare-solution.mjs';

const __dirname = new URL('./', import.meta.url).pathname;

function createProblem (dirname) {
  var exports = {}

  var problemName = dirname.split(sep)
  var i18n

  problemName = problemName[problemName.length - 1]

  exports.init = function (workshopper) {
    i18n = workshopper.i18n
    var postfix = workshopper.i18n.lang() === 'en' ? '' : '_' + workshopper.i18n.lang()
    this.problem = { file: join(dirname, 'problem' + postfix + '.md') }
    this.solution = { file: join(dirname, 'solution' + postfix + '.md') }
    this.solutionPath = resolve(__dirname, '..', 'solutions', problemName, 'index.js')
    this.troubleshootingPath = join(__dirname, '..', 'i18n', 'troubleshooting' + postfix + '.md')
  }

  exports.verify = function (args, cb) {
    var attemptPath = resolve(process.cwd(), args[0])
    compare(this.solutionPath, attemptPath, i18n, function (match, obj) {
      if (match) {
        return cb(true)
      }

      if (!obj) {
        // An error occured, we've already printed an error
        return
      }

      var message = getFile(this.troubleshootingPath)

      message = message.replace(/%solution%/g, obj.solution)
      message = message.replace(/%attempt%/g, obj.attempt)
      message = message.replace(/%diff%/g, obj.diff)
      message = message.replace(/%filename%/g, args[0])

      exports.fail = [
        { text: message, type: 'md' },
        require('./footer.js')
      ]

      cb(false)
    }.bind(this))
  }

  return exports
}

export default createProblem;
