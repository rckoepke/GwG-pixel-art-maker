let canvas = $('#pixelCanvas');

function makeGrid() {
  //clears any existing grids/cells
  canvas.children().remove();

  //sets the columns
  let inputCols = $('#inputWidth').val();
  canvas.css('grid-template-columns', 'repeat(' + inputCols + ', auto)');

  //sets the total number of cells to create
  let inputCells = inputCols * $('#inputHeight').val();

  //build all the cells
  for (let cell = 1; cell <= inputCells; cell++) {
    let newCell = $("<div/>")   //constructs a div element
      .addClass("box")   // adds a class
    canvas.append(newCell); //writes the construction to the canvas HTML as a new line
  }
}

$('#sizePicker').submit(function (event) {
  event.preventDefault();
  makeGrid();
});

canvas.on('mousedown', 'div', function () {
  let color = $('#colorPicker').val();
  $(this).css('background-color', color);
});

$(document).mousedown(function () {
  mouseDown = true;
});
$(document).mouseup(function () {
  mouseDown = false;
});
canvas.on('mouseover', 'div', function () {
  if (mouseDown) {
    let color = $('#colorPicker').val();
    $(this).css('background-color', color);
  }
});