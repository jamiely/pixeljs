define([], function () {
    'use strict';

    var ColorIndex = function() {
      this.color = function(index) {
        return index == 0 ? 'FFFFFF' : '000000';
      }
    };
    /**
     * Manages pixels.
     **/
    var PixelCanvas = function(colorIndex, width, height) {
      var indices = [];
      for(var i = 0; i < width * height; i++) indices.push(0);

      function toPos(x, y) {
        return y * height + x;
      }

      this.get = function(x, y) {
        return indices[toPos(x,y)];
      };

      this.getColor = function(x, y) {
        return colorIndex.color(this.get(x, y));
      };

      this.set = function(x, y, index) {
        indices[toPos(x,y)] = index;
      }

      this.size = function() {
        return { width: width, height: height};
      }

      this.colors = function() {
        return indices.map(colorIndex.color);
      };
    };

    return {
      ColorIndex: ColorIndex,
      PixelCanvas: PixelCanvas
    };
});
