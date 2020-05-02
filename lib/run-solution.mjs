import {stat} from 'fs/promises';
import {exec} from 'child_process';

/**
 * @param {!string} filePath
 * @return {Promise}
 */
async function exists (filePath) {
  try {
    await stat(filePath);
  }
  catch (e) {
    return false;
  }
  return true;
}

/**
 * @param {!string} filePath
 * @return {Promise}
 */
function executeSolution (filePath) {
  return new Promise(function (resolve, reject) {
    exec('node "' + filePath + '"', function (err, stdout, stderr) {
      if (err) {
        return reject(err)
      }

      return resolve(stdout)
    })
  })
}

/**
 * @param {string} solutionPath
 * @param {!{__: function(string, object)}} i18n
 * @param {function} cb
 */
export default function (solutionPath, i18n, cb) {
  exists(solutionPath).then(function (solutionExists) {
    if (!solutionExists) {
      throw new Error(i18n.__('error.exercise.missing_file', { exerciseFile: solutionPath }))
    }

    return executeSolution(solutionPath)
  }).then(function (stdout) {
    cb(null, stdout)
  }).catch(cb)
}
