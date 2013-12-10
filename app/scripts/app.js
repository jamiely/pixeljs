/*global define */
define(['pixel', 'pixel_renderer'], function (pixel, pixelRenderer) {
    'use strict';

    function init(mainCanvasElement, previewCanvasElement) {
      var colorIndex = new pixel.ColorIndex();
      var size = {width: 32, height: 32};
      var canvas = new pixel.PixelCanvas(colorIndex, size.width, size.height);
      for(var i = 0; i < size.width; i+=4 ){
        for(var j = 0; j < size.height; j+=4 ) {
          var jE = j % 2 == 0;
          var ind = i % 2 == 0 ? jE : !jE;
          canvas.set(i, j, ind);
          canvas.set(i+1, j, ind);
          canvas.set(i, j+1, ind);
          canvas.set(i+1, j+1, ind);
        }
      }

      var previewRenderer = new pixelRenderer.DefaultRenderer(previewCanvasElement);
      previewRenderer.render(canvas);

      var renderer = new pixelRenderer.ScaleRenderer(mainCanvasElement, canvas, 20);
      setTimeout(function () {
        renderer.render();
      }, 500);
    }

    return {
      test: '\'Allo \'Allo!',
      init: init
    };
});
