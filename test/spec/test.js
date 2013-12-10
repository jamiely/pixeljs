define(['pixel', 'chai'], function(pixel, chai) {
  /*global describe it */
  'use strict';
  var expect = chai.expect;

  (function () {
    describe('ColorIndex', function() {
      it('#color', function() {
        var index = new pixel.ColorIndex();
        expect(index.color(0)).to.equal('FFFFFF');
        expect(index.color(1)).to.equal('000000');
        expect(index.color(2)).to.equal('000000');
      });
    });
    describe('PixelCanvas', function() {
      it('defaults to 0 indices', function() {
        var canvas = new pixel.PixelCanvas(new pixel.ColorIndex(), 2, 2);
        expect(canvas.get(0, 0)).to.equal(0);
        expect(canvas.get(1, 1)).to.equal(0);
        expect(canvas.get(2, 2)).to.equal(undefined);
      });
      it('sets pixels', function() {
        var canvas = new pixel.PixelCanvas(new pixel.ColorIndex(), 2, 2);
        expect(canvas.get(0, 0)).to.equal(0);
        canvas.set(0, 0, 1);
        expect(canvas.get(0, 0)).to.equal(1);
      });
      it('returns a color', function() {
        var canvas = new pixel.PixelCanvas(new pixel.ColorIndex(), 2, 2);
        expect(canvas.getColor(0, 0)).to.equal('FFFFFF');
        canvas.set(0, 0, 1);
        expect(canvas.getColor(0, 0)).to.equal('000000');
      });
      it('returns colors', function() {
        var canvas = new pixel.PixelCanvas(new pixel.ColorIndex(), 2, 2);
        canvas.set(0, 0, 1);
        var colors = canvas.colors();
        expect(colors[0]).to.equal('000000');
        expect(colors[1]).to.equal('FFFFFF');
        expect(colors[2]).to.equal('FFFFFF');
        expect(colors[3]).to.equal('FFFFFF');
      });
    });
  })();
});
