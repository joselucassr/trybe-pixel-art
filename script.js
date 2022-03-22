const pixelBoard = document.getElementById('pixel-board');

pixelBoard.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

pixelBoard.addEventListener('mousedown', (event) => {
  event.preventDefault();
});

const pen = new Pen();

const paletteElement = document.getElementById('color-palette');
const paletteColors = ['rgb(0, 0, 0)'];

function generateColors(amount, array) {
  for (let i = 0; i < amount; i += 1) {
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    array.push(`rgb(${r}, ${g}, ${b})`);
  }
}

generateColors(5, paletteColors);

for (let i = 0; i < paletteColors.length; i += 1) {
  const colorElement = document.createElement('div');
  colorElement.classList.add('color');
  colorElement.style.backgroundColor = paletteColors[i];

  if (i === 0) {
    colorElement.classList.add('selected');
  }

  paletteElement.appendChild(colorElement);

  colorElement.addEventListener('click', () => {
    const allColors = document.querySelectorAll('.color');

    allColors.forEach((color) => {
      if (color.classList.contains('selected')) {
        color.classList.remove('selected');
      }
    });

    colorElement.classList.add('selected');
    pen.changeColor(paletteColors[i]);
  });
}

let pixelSize = 40;
let pixelAmt = 5;
let pixelDensity = 1;
let savedPixels = undefined;

if (Storage) {
  if (localStorage.pixelAmt) pixelAmt = localStorage.pixelAmt;
  if (localStorage.pixelDensity) pixelDensity = localStorage.pixelDensity;
  if (localStorage.pixels) savedPixels = JSON.parse(localStorage.pixels);
}

let pixels = new Pixels(
  pixelBoard,
  pixelSize,
  pixelAmt,
  pixelDensity,
  savedPixels
);
pixels.createBoard();

function updateDisplayText(id, text) {
  let element = document.getElementById(id);
  element.innerText = text;
}

updateDisplayText('pixelAmtDisplay', pixelAmt);
updateDisplayText('pixelDensityDisplay', pixelDensity);

function clearBoard() {
  pixels.pixels.forEach((pixel) => pixel.reset());
  if (Storage) {
    localStorage.pixels = '';
    localStorage.pixels = JSON.stringify(pixels.pixels);
  }
}

const clearBoardBtn = document.getElementById('clear-board');
clearBoardBtn.addEventListener('click', clearBoard);

function generateBoard() {
  let boardSizeValue = document.getElementById('board-size').value;
  let pixelDensity = document.getElementById('pixel-density').value;

  if (boardSizeValue) {
    pixelAmt = boardSizeValue;
  }

  if (!pixelDensity) {
    pixelDensity = 1;
  }

  if (pixelAmt < 5) pixelAmt = 5;
  if (pixelAmt > 50) pixelAmt = 50;

  if (pixelDensity < 1) pixelDensity = 1;

  pixels = new Pixels(pixelBoard, pixelSize, pixelAmt, pixelDensity);
  pixels.createBoard();

  if (Storage) {
    localStorage.pixelAmt = pixelAmt;
    localStorage.pixelDensity = pixelDensity;
  }

  updateDisplayText('pixelAmtDisplay', pixelAmt);
  updateDisplayText('pixelDensityDisplay', pixelDensity);
}

const generateBoardBtn = document.getElementById('generate-board');
generateBoardBtn.addEventListener('click', generateBoard);

const pixelAmtInput = document.getElementById('board-size');
const pixelDensityInput = document.getElementById('pixel-density');

function checkEnter(e) {
  if (e.keyCode === 13) generateBoard();
}

pixelAmtInput.addEventListener('keyup', (e) => checkEnter(e));
pixelDensityInput.addEventListener('keyup', (e) => checkEnter(e));

const toggleGrid = document.getElementById('toggle-grid');
toggleGrid.addEventListener('click', () => pixels.toggleGrid());
