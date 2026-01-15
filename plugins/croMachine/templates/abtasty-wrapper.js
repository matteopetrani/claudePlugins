/* ABTasty variant wrapper template */
(function () {
  'use strict';

  var CONFIG = {
    testId: 'TEST_ID',
    debug: true,
  };

  function log() {
    if (!CONFIG.debug) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[ABTasty]');
    console.log.apply(console, args);
  }

  function logError(err) {
    console.error('[ABTasty]', err);
  }

  function onReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 0);
      return;
    }
    document.addEventListener('DOMContentLoaded', fn);
  }

  function applyVariant() {
    // TODO: implement DOM changes
  }

  onReady(function () {
    try {
      applyVariant();
      log('Variant applied');
    } catch (err) {
      logError(err);
    }
  });
})();
