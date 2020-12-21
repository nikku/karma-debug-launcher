const {
  URL
} = require('url');

const which = require('which');

const openBin = which.sync('open-cli');


/**
 * A simple karma launcher that opens the debug view
 * of the test suite at hand with your default browser,
 * via the <open-cli> utilit.
 *
 * @param {Function} baseBrowserDecorator
 * @param {Object} args
 */
function DebugBrowser(baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  this._getOptions = function(url) {

    /**
     * We open the debug page of the given runner
     * instance.
     */
    return [ new URL('/debug.html', url).toString() ];
  };

  this._onProcessExit = function(e) {

    /**
     * We do signal we're done (FINISHED) as soon
     * as open completes. Otherwise Karma will wait
     * for us, assuming we are an actual runner.
     *
     * We do not want Karma to wait for us.
     */
    this._done();
  };
}

DebugBrowser.prototype = {
  name: 'Debug',

  DEFAULT_CMD: {
    linux: openBin,
    darwin: openBin,
    win32: openBin
  }
};

DebugBrowser.$inject = ['baseBrowserDecorator', 'args'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:Debug': ['type', DebugBrowser]
};