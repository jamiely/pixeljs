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

    function coordinates(canvas) {
      var sz = canvas.size();
      var coords = _.range(sz.width).map(function(i) {
        return _.range(sz.height).map(function(j) {
          return {x: i, y: j};
        });
      });
      return _.flatten(coords);
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
      scale = Math.floor(scale || 1);

      var size = canvas.size();
      var context = element.getContext('2d');

      var width = Math.floor(size.width * scale);
      var height = Math.floor(size.height * scale);
      var pixelCount = width * height;

      this.render = function() {
        var scl = function(i) { return Math.floor(i * scale) };

        coordinates(canvas).forEach(function(c) {
          context.fillStyle = "#" + canvas.getColor(c.x, c.y);
          context.fillRect(scl(c.x), scl(c.y), scale, scale);
        });
      };
    };

    return {
      DefaultRenderer: Renderer,
      ScaleRenderer: ScaleRenderer
    };
});

