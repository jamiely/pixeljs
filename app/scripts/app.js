/*global define */
define(['pixel', 'pixel_renderer'], function (pixel, pixelRenderer) {
    'use strict';

    function init(canvasElement) {
      var colorIndex = new pixel.ColorIndex();
      var size = {width: 32, height: 32};
      var canvas = new pixel.PixelCanvas(colorIndex, size.width, size.height);
      for(var i = 0; i < size.width; i++ ){
        for(var j = 0; j < size.height; j++ ) {
          var jE = j % 2 == 0;
          canvas.set(i, j, i % 2 == 0 ? jE : !jE);
        }
      }

      //var renderer = new pixelRenderer.DefaultRenderer(canvasElement);
      //renderer.render(canvas);
      var renderer = new pixelRenderer.ScaleRenderer(canvasElement, canvas, 20);
      setTimeout(function () {
        renderer.render();
      }, 500);
    }

    return {
      test: '\'Allo \'Allo!',
      init: init
    };
});
