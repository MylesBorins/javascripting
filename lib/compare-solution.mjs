/* eslint-disable standard/no-callback-literal */

import 'colors'

import path from 'path';
import diff from 'diff';
import run from './run-solution.mjs'

function generateDiff (solution, attempt) {
  var parts = diff.diffChars(solution, attempt)

  var result = ''

  parts.forEach(function (part) {
    if (part.added) {
      result += part.value.bgRed
    } else if (part.removed) {
      result += part.value.bgGreen
    } else {
      result += part.value
    }
  })

  return result
}

export default function (solution, attempt, i18n, cb) {
  run(solution, i18n, function (err, solutionResult) {
    if (err) {
      console.error(err)
      return cb(false)
    }

    run(attempt, i18n, function (err, attemptResult) {
      if (err && err.code !== 8) {
        console.error(err)
        return cb(false)
      }

      if (solutionResult === attemptResult) {
        return cb(true)
      }

      cb(false, {
        solution: solutionResult,
        attempt: err || attemptResult,
        diff: generateDiff(solutionResult, attemptResult)
      })
    })
  })
}
