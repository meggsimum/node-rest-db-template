import process from 'process';

/**
 * Util class with functions for logging.
 *
 * @author C. Mayer (meggsimum)
 */
const logLevels = {
  DEBUG: 1,
  INFO: 10,
  WARN: 20,
  ERROR: 30
};

let logLevel = process.env.COLESLAW_REST_LOGLEVEL || 'INFO';
if (!logLevels[logLevel]) {
  console.warn('Unsupported log level specified by ENV VAR "COLESLAW_REST_LOGLEVEL", using "INFO"');
  logLevel = 'INFO';
}

/**
 * Outputs a debug log
 */
const debug = function () {
  if (logLevel === 'DEBUG') {
    let args = Array.prototype.slice.call(arguments);
    args = ['DEBUG:', ...args];
    console.log.apply(console, args);
  }
}

/**
 * Outputs an info log
 */
const info = function () {
  if (logLevels[logLevel] <= 10) {
    let args = Array.prototype.slice.call(arguments);
    args = ['INFO :', ...args];
    console.info.apply(console, args);
  }
}

/**
 * Outputs a warning log
 */
const warn = function () {
  if (logLevels[logLevel] <= 20) {
    let args = Array.prototype.slice.call(arguments);
    args = ['WARN :', ...args];
    console.warn.apply(console, args);
  }
}

/**
 * Outputs an error log
 */
const error = function () {
  if (logLevels[logLevel] <= 30) {
    let args = Array.prototype.slice.call(arguments);
    args = ['ERROR:', ...args];
    console.error.apply(console, args);
  }
}

/**
 * Logs message with a frame of '------'.
 *
 * @param {String} msg The message to be logged
 * @param {Boolean} verboseOnly Respect verbose logging or not
 */
const framed = function (msg, verboseOnly) {
  if (!verboseOnly) {
    console.log('-----------------------------------------------');
    console.log(msg);
    console.log('-----------------------------------------------');
  } else {
    if (logLevel === 'DEBUG') {
      console.log('-----------------------------------------------');
      console.log(msg);
      console.log('-----------------------------------------------');
    }
  }
}

export default {
  debug,
  info,
  warn,
  error,
  framed
}
