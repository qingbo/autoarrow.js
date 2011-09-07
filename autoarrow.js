function ArrowContainer(containerId, strokeStyle) {
  this.init(containerId, strokeStyle);
}

$.extend(ArrowContainer.prototype, {
  canvas: null,
  strokeStyle: null,
  arrows: [],

  init: function(containerId, strokeStyle) {
    this.strokeStyle = strokeStyle;
    this.container = $('#' + containerId);
    this.container.css({
      'position': 'relative',
      'background-color': 'transparent'
    });
    this.canvas = $('<canvas id="' + containerId + '-canvas"></canvas>');
    this.setupCanvas();
    this.canvas.css({
      'position': 'absolute',
      'left': 0,
      'top': 0,
      'z-index': '-10'
    });
    this.canvas.appendTo(this.container);
    var c = this;
    $(window).resize(function() {c.redraw()}); // register with window resize event
  },

  setupCanvas: function() {
    var width = this.container.width();
    var height = this.container.height();
    this.canvas.attr('width', width);
    this.canvas.attr('height', height);
    this.containerOffset = this.container.offset();
    this.context = this.canvas[0].getContext('2d');
    this.context.strokeStyle = this.strokeStyle;
  },

  redraw: function() {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
    // resize canvas
    this.setupCanvas();
    for (var i in this.arrows) {
      a = this.arrows[i];
      this.drawArrow(a[0], a[1], a[2], a[3], a[4], a[5]);
    }
  },

  addArrow: function(f, i, x1, y1, width, height) {
    var from = $('#' + f);
    var img = $('#' + i);
    img.css({
      'z-index': '-100',
      'position': 'relative'
    });
    this.arrows.push([from, img, x1, y1, width, height]);
    this.drawArrow(from, img, x1, y1, width, height);
  },

  drawArrow: function(from, img, x1, y1, width, height) {
    var baseOffset = this.containerOffset;
    var fromOffset = from.offset();
    var fromX1 = fromOffset.left - baseOffset.left;
    var fromY1 = fromOffset.top - baseOffset.top;
    var fromX2 = fromX1 + from.width();
    var fromY2 = fromY1 + from.height();

    var imgOffset = img.offset();
    var toX1 = imgOffset.left - baseOffset.left + x1;
    var toY1 = imgOffset.top - baseOffset.top + y1;
    var toX2 = toX1 + width;
    var toY2 = toY1 + height;

    var startX, startY, endX, endY, c1X, c1Y, c2X, c2Y, a1X, a1Y, a2X, a2Y;
    if (fromX2 < toX1) {
      startX = (fromX1 + fromX2) / 2;
      if (fromY2 < toY1 || fromY1 > toY2) {
        startY = fromY2 < toY1 ? fromY2 : fromY1;
        endX = toX1;
        endY = (toY1 + toY2) / 2;
        c1X = startX;
        c1Y = (startY + endY) / 2;
        c2X = (startX + endX) / 2;
        c2Y = endY;
        a1X = endX - 5;
        a1Y = endY - 5;
        a2X = endX - 5;
        a2Y = endY + 5;
      } else {
        startY = fromY2;
        endX = (toX1 + toX2) / 2;
        endY = toY2;
        c1X = startX;
        c1Y = c2Y = (fromY2 > toY2 ? fromY2 : toY2) + 50;
        c2X = endX;
        a1X = endX - 5;
        a1Y = endY + 5;
        a2X = endX + 5;
        a2Y = endY + 5;
      }
    } else if (fromX1 > toX2) {
      startX = (fromX1 + fromX2) / 2;
      if (fromY2 < toY1 || fromY1 > toY2) {
        startY = fromY2 < toY1 ? fromY2 : fromY1;
        endX = toX2;
        endY = (toY1 + toY2) / 2;
        c1X = startX;
        c1Y = (startY + endY) / 2;
        c2X = (startX + endX) / 2;
        c2Y = endY;
        a1X = endX + 5;
        a1Y = endY - 5;
        a2X = endX + 5;
        a2Y = endY + 5;
      } else {
        startY = fromY2;
        endX = (toX1 + toX2) / 2;
        endY = toY2;
        c1X = startX;
        c1Y = c2Y = (fromY2 > toY2 ? fromY2 : toY2) + 50;
        c2X = endX;
        a1X = endX - 5;
        a1Y = endY + 5;
        a2X = endX + 5;
        a2Y = endY + 5;
      }
    } else {
      startX = fromX2;
      startY = (fromY1 + fromY2) / 2;
      endX = toX2;
      endY = (toY1 + toY2) / 2;
      c1Y = startY;
      c1X = c2X = (fromX2 > toX2 ? fromX2 : toX2) + 50;
      c2Y = endY;
      a1X = endX + 5;
      a1Y = endY - 5;
      a2X = endX + 5;
      a2Y = endY + 5;
    }

    //this.context.strokeStyle = '#09f';
    this.context.moveTo(startX, startY);
    // draw curve
    this.context.bezierCurveTo(c1X, c1Y, c2X, c2Y, endX, endY);
    // draw arrow head
    this.context.lineTo(a1X, a1Y);
    this.context.moveTo(endX, endY);
    this.context.lineTo(a2X, a2Y);
    this.context.stroke();
  },
});
