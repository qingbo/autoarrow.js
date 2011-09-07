autoarrow.js is a simple piece of JavaScript code that can draw an arrow from any element
to a rectangle in an image. When describing an image, it can be used conveniently to point to objects in the image from the words mentioning it.

<img src="https://github.com/qingbo/autoarrow.js/raw/master/screenshot.png" style="width:300px;box-shadow:rgba(0,0,0,0.3) 0 0 5px" />

This script has not been well tested but it runs well in current versions of Firefox/Chrome.

### Features

- It chooses a relatively good-looking path based on the relative positions using a very simple algorithm. It's enough since in practice we'll never get it into a mess like shown in the screenshot above.
- When window resizes it redraws the arrows based on new relative positions.

### How to Use

Please see sample.html for its usage. Basically follow these steps:

1. Select an element (often a div) where the elements you want to link resides. Call `new ArrowContainer()` with its id, and a color string for the arrows.
2. After the container is created, call `container.addArrow()` to add arrows into the canvas. The arguments:
    1. from: id of element where the arrow starts
    2. img: id of the image the arrow points to
    3. x1, y1: coordinate of the top left point of the arrow target object (origin being top left of the image)
    4. width, height: size of the object
