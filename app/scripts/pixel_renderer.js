define(['pixel', 'lodash'], function (pixel, _) {
    'use strict';

    function setColor(data, offset, color) {
      data[offset + 0] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = color[3];
    }

    var white = [200, 200, 200, 255];
    var black = [0, 0, 0, 255];
    function col(c) {
      return c == 'FFFFFF' ? white : black;
    }

    var Renderer = function(element) {
      var context = element.getContext('2d');

      this.newImageData = function(canvas) {
        var size = canvas.size();
        return context.createImageData(size.width, size.height);
      }

      this.colors = function(canvas) {
        return canvas.colors();
      };

      this.render = function(canvas) {
        var iData = this.newImageData(canvas);
        var i = 0;
        this.colors(canvas).forEach(function(color) {
          setColor(iData.data, i, col(color));
          i += 4;
        });
        context.putImageData(iData, 0, 0);
      };
    };

    var ScaleRenderer = function(element, canvas, scale) {
      scale = scale || 1;

      var size = canvas.size();
      var context = element.getContext('2d');

      var width = Math.floor(size.width * scale);
      var height = Math.floor(size.height * scale);
      var pixelCount = width * height;

      this.newImageData = function() {
        return context.createImageData(width, height);
      }

      function toCoords(i) {
        var x = i % width;
        var y = Math.floor(i / width);
        return { x: x, y: y };
      }

      var color = function(i) {
        var coords = toCoords(i);
        var norm = {x: Math.floor(coords.x / scale), y: Math.floor(coords.y / scale)};
        return canvas.getColor(norm.x, norm.y);
      };

      var colors = function() {
        return _.range(pixelCount).map(color);
      }

      this.render = function() {
        var iData = this.newImageData(canvas);
        var i = 0;
        colors(canvas).forEach(function(color) {
          console.log("Setting color: " + color);
          setColor(iData.data, i, col(color));
          i += 4;
        });
        context.putImageData(iData, 0, 0);
      };
    };

    return {
      DefaultRenderer: Renderer,
      ScaleRenderer: ScaleRenderer
    };
});

