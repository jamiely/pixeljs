require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        lodash: '../components/lodash/lodash',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    // use app here
    console.log(app.test);
    console.log('Running jQuery %s', $().jquery);

    function mainCanvas() {
      return $('#mainCanvas').get(0);
    }

    function previewCanvas() {
      return $('#previewCanvas').get(0);
    }

    $(function() { 
      app.init(mainCanvas(), previewCanvas()); 
    });
});
