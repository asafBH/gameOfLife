//when page load
document.addEventListener("DOMContentLoaded", event => {
  setup();

  //game of life
  //
  function setup() {
    make2DArray();
    createGrid();
    createGridOnScreen();
  }
//create 2 dim arrays - current and next generations.

function make2DArray(COLS, ROWS) {
    let arr = new Array(COLS);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(ROWS);
    }
    return arr;
  }
  // create grid with send to give life to cell
  function createGrid() {
    firstgrid = make2DArray(COLS, ROWS);
    nextGenertion = make2DArray(COLS, ROWS);
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        firstgrid[i][j] = 0;
        nextGenertion[i][j] = 0;
      }
    }
  }
  const cell = document.createElement("div");
  cell.addEventListener("click", event => {
    theTarget = event.target;
    giveLife(theTarget);
  });
});

//give life or kill cell func
function giveKillCell() {
  if (cell.classList.contains("alive")) {
    cell.setAttribute("class", "dead");
    firstgrid[i][j] = 0;
  } else {
    cell.setAttribute("class", "alive");
    firstgrid[i][j] = 1;
  }
}

//grid for run on
let firstgrid;
//grid for next generation calc
let nextGenertion;
//const of cols and rows
const ROWS = 22;
const COLS = 66;
//timer on run method for continuos run
let timerForGrid;
//num of neigbhers
const TwoNeighber =2;
const ThreeNeighber =3;

//function for set attribute for each cell by class and see in table the change
function changeTable() {
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLS; j++) {
      var cell = document.getElementById(`row${i}col${j}`);
      if (firstgrid[i][j] === 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
    }
  }
}

//set matrix to count neighbors
function countSiblings(irow, jcol) {
  let RowStart = 0;
  let ColStart = 0;
  let RowEnd = ROWS - 1;
  let ColEnd = COLS - 1;

  let sumOfNeigbors = 0;
  sumOfNeigbors -= firstgrid[irow][jcol];
  if (irow - 1 > 0) RowStart = irow - 1;
  if (jcol - 1 > 0) ColStart = jcol - 1;
  if (irow + 1 <= RowEnd) RowEnd = irow + 1;
  if (jcol + 1 <= ColEnd) ColEnd = jcol + 1;

  for (let i = RowStart; i <= RowEnd; i++) {
    for (let j = ColStart; j <= ColEnd; j++) {
      if (firstgrid[i][j] === 1) sumOfNeigbors++;
    }
  }
  return sumOfNeigbors;
}

//Asmble matrix by rules
function asmbMtrx() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let currentMode = firstgrid[i][j];
      let sumOfNeighbers = countSiblings(i, j);

      if (currentMode === 0 && sumOfNeighbers === 3) {
        nextGenertion[i][j] = 1;
      } else if (currentMode === 1 && (sumOfNeighbers < TwoNeighber || sumOfNeighbers > ThreeNeighber)) {
        nextGenertion[i][j] = 0;
      } else {
        nextGenertion[i][j] = currentMode;
      }
    }
  }
  asmArrays();
  clean2Array();
}


//assemble next generation array to first array
function asmArrays() {
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLS; j++) {
      firstgrid[i][j] = nextGenertion[i][j];
    }
  }
}
//clean next generation array
function clean2Array() {
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLS; j++) {
      nextGenertion[i][j] = 0;
    }
  }
}

//on click run button
function run() {
  asmbMtrx();
  changeTable();
  timerForGrid = setTimeout(run, 20);
}
const cellLive = 1;

//populate the array with random values 0/1
function randomGrid() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      firstgrid[i][j] = Math.floor(Math.random() * 2);
      if (firstgrid[i][j] === cellLive) {
        let cell = document.getElementById(`row${i}col${j}`);
        cell.setAttribute("class", "alive");
      } else {
        let cell = document.getElementById(`row${i}col${j}`);
        cell.setAttribute("class", "dead");
      }
    }
  }
}

//draw table grid in the web page
function createGridOnScreen() {
  const intFrameHeight = 500;
  const intFrameWidth = 1000;
  const cellWidth = intFrameWidth / COLS;
  const cellHeight = intFrameHeight / ROWS;
  let grid = document.getElementById("tabGrid");
  let table = document.createElement("table");
  table.setAttribute("class", "tabDiv");

  for (let i = 0; i < ROWS; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < COLS; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `row${i}col${j}`);
      cell.setAttribute("class", "dead");
      tr.appendChild(cell);
      cell.style.cssText = `height: ${cellHeight}px;width: ${cellWidth}px`;
      cell.addEventListener("click", giveKillCell);
      {
      }
      table.appendChild(tr);
    }
    grid.appendChild(table);
  }
}


