class Pixels {
  constructor(_parentElement, _pixelSize, _pixelAmt, _pixelDensity, _pixels) {
    this.parentElement = _parentElement;
    this.pixelSize = _pixelSize;
    this.pixelAmt = _pixelAmt;
    this.pixelDensity = _pixelDensity || 1;
    this.savedPixels = _pixels || undefined;
    this.pixels = [];
    this.gridIsOn = false;
  }

  createBoard() {
    this.parentElement.innerHTML = '';
    this.pixels = [];

    const boardSide = this.pixelSize * this.pixelAmt;
    this.parentElement.style.height = `${boardSide + this.pixelAmt * 2}px`;
    this.parentElement.style.width = `${boardSide + this.pixelAmt * 2}px`;

    for (let i = 0; i < this.pixelAmt * this.pixelDensity; i += 1) {
      for (let j = 0; j < this.pixelAmt * this.pixelDensity; j += 1) {
        const pixel = new Pixel((this.pixelSize + 2) / this.pixelDensity - 2);
        this.pixels.push(pixel);
        this.parentElement.appendChild(pixel.element);

        if (this.savedPixels) {
          const pixelSavedPixel = this.savedPixels[this.index(j, i)];
          pixel.changeColor(pixelSavedPixel.color);
        }
      }
    }
  }

  toggleGrid() {
    if (!this.gridIsOn) {
      this.pixels.forEach((pixel) => {
        pixel.changeBorder();
      });

      this.gridIsOn = true;
    } else {
      this.pixels.forEach((pixel) => {
        pixel.changeBorder('#000000');
      });
      this.gridIsOn = false;
    }
  }

  index(j, i) {
    let cols = this.pixelAmt * this.pixelDensity;
    let rows = cols;

    if (j < 0 || i < 0 || j > cols - 1 || i > rows - 1) {
      return -1;
    }
    return j + i * cols;
  }
}
