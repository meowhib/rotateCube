var canvas = document.querySelector("canvas");
var cont = canvas.getContext("2d");

var vHeight = window.innerHeight;
var vWidth = window.innerWidth;

canvas.height = vHeight;
canvas.width = vWidth;

//Inputs (angles)
var xangleinput = document.getElementById("x");
var yangleinput = document.getElementById("y");
var zangleinput = document.getElementById("z");

//Starting values
xangleinput.value = 3.14;
yangleinput.value = 0;
zangleinput.value = 3.14;

//Plane variables
var screen = [0, 0, -300];
var screenSize = [100, 100];
var eye = [0, 0, -500];
var zn = 500;

//Cube corners coordinates
var cubeDots = [
  [100, 100, 100],
  [-100, 100, 100],
  [-100, -100, 100],
  [100, -100, 100],
  [100, 100, -100],
  [-100, 100, -100],
  [-100, -100, -100],
  [100, -100, -100],
]

//Keeps track of the cube after it's rotation (used to draw the cube only)
var rotatedCube = [];

//Connects corners of a cube (this is done manually and can cause problems if coordinates of points are not in order)
function drawCube(cube){
  coordinatedi = coordinator([cube[0][0] * ((zn) / (zn+cube[0][2])), cube[0][1] * ((zn) / (zn+cube[0][2])), 0]);
  coordinatedj = coordinator([cube[1][0] * ((zn) / (zn+cube[1][2])), cube[1][1] * ((zn) / (zn+cube[1][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[1][0] * ((zn) / (zn+cube[1][2])), cube[1][1] * ((zn) / (zn+cube[1][2])), 0]);
  coordinatedj = coordinator([cube[2][0] * ((zn) / (zn+cube[2][2])), cube[2][1] * ((zn) / (zn+cube[2][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[2][0] * ((zn) / (zn+cube[2][2])), cube[2][1] * ((zn) / (zn+cube[2][2])), 0]);
  coordinatedj = coordinator([cube[3][0] * ((zn) / (zn+cube[3][2])), cube[3][1] * ((zn) / (zn+cube[3][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[3][0] * ((zn) / (zn+cube[3][2])), cube[3][1] * ((zn) / (zn+cube[3][2])), 0]);
  coordinatedj = coordinator([cube[0][0] * ((zn) / (zn+cube[0][2])), cube[0][1] * ((zn) / (zn+cube[0][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[3][0] * ((zn) / (zn+cube[3][2])), cube[3][1] * ((zn) / (zn+cube[3][2])), 0]);
  coordinatedj = coordinator([cube[7][0] * ((zn) / (zn+cube[7][2])), cube[7][1] * ((zn) / (zn+cube[7][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[2][0] * ((zn) / (zn+cube[2][2])), cube[2][1] * ((zn) / (zn+cube[2][2])), 0]);
  coordinatedj = coordinator([cube[6][0] * ((zn) / (zn+cube[6][2])), cube[6][1] * ((zn) / (zn+cube[6][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[1][0] * ((zn) / (zn+cube[1][2])), cube[1][1] * ((zn) / (zn+cube[1][2])), 0]);
  coordinatedj = coordinator([cube[5][0] * ((zn) / (zn+cube[5][2])), cube[5][1] * ((zn) / (zn+cube[5][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[0][0] * ((zn) / (zn+cube[0][2])), cube[0][1] * ((zn) / (zn+cube[0][2])), 0]);
  coordinatedj = coordinator([cube[4][0] * ((zn) / (zn+cube[4][2])), cube[4][1] * ((zn) / (zn+cube[4][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[5][0] * ((zn) / (zn+cube[5][2])), cube[5][1] * ((zn) / (zn+cube[5][2])), 0]);
  coordinatedj = coordinator([cube[4][0] * ((zn) / (zn+cube[4][2])), cube[4][1] * ((zn) / (zn+cube[4][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[5][0] * ((zn) / (zn+cube[5][2])), cube[5][1] * ((zn) / (zn+cube[5][2])), 0]);
  coordinatedj = coordinator([cube[6][0] * ((zn) / (zn+cube[6][2])), cube[6][1] * ((zn) / (zn+cube[6][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[6][0] * ((zn) / (zn+cube[6][2])), cube[6][1] * ((zn) / (zn+cube[6][2])), 0]);
  coordinatedj = coordinator([cube[7][0] * ((zn) / (zn+cube[7][2])), cube[7][1] * ((zn) / (zn+cube[7][2])), 0]);
  drawLine(coordinatedi, coordinatedj)

  coordinatedi = coordinator([cube[4][0] * ((zn) / (zn+cube[4][2])), cube[4][1] * ((zn) / (zn+cube[4][2])), 0]);
  coordinatedj = coordinator([cube[7][0] * ((zn) / (zn+cube[7][2])), cube[7][1] * ((zn) / (zn+cube[7][2])), 0]);
  drawLine(coordinatedi, coordinatedj);
}

//Clears the screen
function clearScreen(){
  cont.clearRect(0, 0, vWidth, vHeight);
}

//Draw x and y axis
function drawCenter(){
  cont.strokeStyle = "#333333";
  cont.lineWidth = 3;

  cont.beginPath();
  cont.moveTo(vWidth/2, 0);
  cont.lineTo(vWidth/2, vHeight);
  cont.stroke();

  cont.beginPath();
  cont.moveTo(0, vHeight/2);
  cont.lineTo(vWidth, vHeight/2);
  cont.stroke();
}

//Draw a dot in a certain coordinates
function drawDot(coords){
  cont.beginPath();
  coordinated = [coords[0] * ((zn) / (zn+coords[2])), coords[1] * ((zn) / (zn+coords[2])), coords[2]];
  coordinated = coordinator(coordinated)
  cont.arc(coordinated[0], coordinated[1], 5, 0, Math.PI * 2, true);
  cont.fillStyle = "#FFFFFF";
  cont.fill();
}

//Draw a line between two points
function drawLine(p1, p2){
  cont.strokeStyle = "#FFFFFF";
  cont.lineWidth = 3;
  cont.beginPath();
  cont.moveTo(p1[0], p1[1]);
  cont.lineTo(p2[0], p2[1]);
  cont.stroke();
}

//Transforms math coordinates into screen coordinates ((0, 0) means the center of the screen)
function coordinator(coordinates){
  return [vWidth/2+coordinates[0], vHeight/2-coordinates[1], coordinates[2]];
}

//Rotates the cube around the x axis
function rotateX(vector, angle){
  matrix = [Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 1];
  return matrixVectorMultiply(matrix, vector);
}

//Rotates the cube around the y axis
function rotateY(vector, angle){
  matrix = [Math.cos(angle), 0, Math.sin(angle), 0, 1, 0, -Math.sin(angle), 0, Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

//Rotates the cube around the z axis
function rotateZ(vector, angle){
  matrix = [1, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

//Redraw the cube when any of the angles is changed
function angleChanged(){
  clearScreen();
  drawCenter();
  rotatedCube = [];
  for (var i=0; i<cubeDots.length; i++){
    rotatedCube.push(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
  }
  drawCube(rotatedCube);
}

xangleinput.addEventListener("input", function(){
  angleChanged();
});

yangleinput.addEventListener("input", function(){
  angleChanged();
});

zangleinput.addEventListener("input", function(){
  angleChanged();
});

//Multiplies a vector by a matrix
function matrixVectorMultiply(matrix, vector){
  result = [
    matrix[0] * vector[0] + matrix[1] * vector[1] + matrix[2] * vector[2],
    matrix[3] * vector[0] + matrix[4] * vector[1] + matrix[5] * vector[2],
    matrix[6] * vector[0] + matrix[7] * vector[1] + matrix[8] * vector[2],
  ];
  return result;
}

//Increments the angles by a certain value every x ms
var addX = setInterval(increaseX, 10);
var addY = setInterval(increaseY, 10);
var addZ = setInterval(increaseZ, 10);

function increaseX(){
  if (zangleinput.value >= 3.14){
    zangleinput.value = -3.14;
  } else {
    value = parseFloat(zangleinput.value) + 0.01
    zangleinput.value = value;
  }
  angleChanged();
}

function increaseY(){
  if (yangleinput.value >= 3.14){
    yangleinput.value = -3.14;
    console.log(yangleinput.value);
  } else {
    yangleinput.value = parseFloat(yangleinput.value) + 0.01;
  }
  angleChanged();
}

function increaseZ(){
  if (xangleinput.value >= 3.14){
    xangleinput.value = -3.14;
    console.log(xangleinput.value);
  } else {
    xangleinput.value = parseFloat(xangleinput.value) + 0.01;
  }
  angleChanged();
}

drawCenter();
drawCube(cubeDots);