
require.config({
  paths: {
    jquery: '../../app/components/jquery/jquery',
    lodash: '../../app/components/lodash/lodash',
    pixel: '../../app/scripts/pixel',
    pixel_renderer: '../../app/scripts/pixel_renderer',
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['../spec/test'], function () {
  'use strict';
  mocha.run();
});

