import { Cell } from './cell';

export let gameMatrix = [];

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function addBombs(bombsCount, w, h) {
  let count = bombsCount;

  while (count) {
    const x = generateRandom(0, w - 1);
    const y = generateRandom(0, h - 1);
    const curElem = gameMatrix[y][x];

    if (!curElem) {
      gameMatrix[y][x] = 'b';
      count -= 1;
    }
  }
}

export function createMatrix(width = 10, height = 10, bombsCount = 10) {
  gameMatrix = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  addBombs(bombsCount, width, height);

  gameMatrix.forEach((matrixRow, y) => {
    matrixRow.forEach((cell, x) => gameMatrix[y][x] = new Cell(!!cell, y, x));
  });

  return gameMatrix;
}

export function setMatrix(matrix) {
  gameMatrix = matrix;
}
