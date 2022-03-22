class Pixel {
  constructor(_pixelSize) {
    this.size = _pixelSize;
    this.color = '#ffffff';
    this.element = document.createElement('div');
    this.gridIsOn = true;

    this.init();
  }

  init() {
    this.element.classList.add('pixel');
    this.resize(this.size);
    this.listen();
  }

  listen() {
    this.element.addEventListener('mouseover', (e) => this.paint(e));
    this.element.addEventListener('mousedown', (e) => this.paint(e));
  }

  paint(event) {
    if (event.buttons === 1) {
      this.changeColor(pen.color);
      if (Storage) {
        localStorage.pixels = '';
        localStorage.pixels = JSON.stringify(pixels.pixels);
      }
    }

    if (event.buttons === 2) {
      this.reset();
      if (Storage) {
        localStorage.pixels = '';
        localStorage.pixels = JSON.stringify(pixels.pixels);
      }
    }
  }

  changeColor(color) {
    this.color = color;
    this.element.style.backgroundColor = color;

    if (!this.gridIsOn) this.element.style.borderColor = this.color;
    else this.element.style.borderColor = '#000000';
  }

  resize(size) {
    this.element.style.height = size + 'px';
    this.element.style.width = size + 'px';
  }

  changeBorder(color) {
    this.element.style.borderColor = color || this.color;

    if (!color) this.gridIsOn = false;
    else this.gridIsOn = true;
  }

  reset() {
    this.changeColor('#ffffff');
  }
}
