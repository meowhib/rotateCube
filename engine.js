var canvas = document.querySelector("canvas");
var cont = canvas.getContext("2d");

var vHeight = window.innerHeight;
var vWidth = window.innerWidth;

canvas.height = vHeight;
canvas.width = vWidth;

//DOM elements
var xangleinput = document.getElementById("x");
var yangleinput = document.getElementById("y");
var zangleinput = document.getElementById("z");

//Plane variables
var screen = [0, 0, -300];
var screenSize = [100, 100];
var eye = [0, 0, -500];
var zn = 500;

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

var rotatedCube = [];

//drawLine(coordinator([cubeDots[0][0] * ((zn) / (zn+cubeDots[0][2])), cubeDots[0][1] * ((zn) / (zn+cubeDots[0][2])), 0]), coordinator([cubeDots[1][0] * ((zn) / (zn+cubeDots[1][2])), cubeDots[1][1] * ((zn) / (zn+cubeDots[1][2]))]));

function drawCube(cube){
  for (var i=0; i<cube.length; i++){
    for (var j=0; j<cube.length; j++){
      coordinatedi = coordinator([cube[i][0] * ((zn) / (zn+cube[i][2])), cube[i][1] * ((zn) / (zn+cube[i][2])), 0]);
      coordinatedj = coordinator([cube[j][0] * ((zn) / (zn+cube[j][2])), cube[j][1] * ((zn) / (zn+cube[j][2])), 0]);
      drawLine(coordinatedi, coordinatedj)
    }
  }
}

function clearScreen(){
  cont.clearRect(0, 0, vWidth, vHeight);
}

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

function drawDot(coords){
  cont.beginPath();
  coordinated = [coords[0] * ((zn) / (zn+coords[2])), coords[1] * ((zn) / (zn+coords[2])), coords[2]];
  coordinated = coordinator(coordinated)
  cont.arc(coordinated[0], coordinated[1], 5, 0, Math.PI * 2, true);
  cont.fillStyle = "#FFFFFF";
  cont.fill();
}

function drawLine(p1, p2){
  cont.strokeStyle = "#FFFFFF";
  cont.lineWidth = 3;
  cont.beginPath();
  cont.moveTo(p1[0], p1[1]);
  cont.lineTo(p2[0], p2[1]);
  cont.stroke();
}

function coordinator(coordinates){
  return [vWidth/2+coordinates[0], vHeight/2-coordinates[1], coordinates[2]];
}

function drawAllSquare(square){
  console.log("Drawing all square")
  for (var i=0; i<square.length; i++){
    for (var j=0; j<square.length; j++){
      drawLine(coordinator(square[i]), coordinator(square[j]));
    }
  }
}

function rotateX(vector, angle){
  matrix = [Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 1];
  return matrixVectorMultiply(matrix, vector);
}

function rotateY(vector, angle){
  matrix = [Math.cos(angle), 0, Math.sin(angle), 0, 1, 0, -Math.sin(angle), 0, Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

function rotateZ(vector, angle){
  matrix = [1, 0, 0, 0, Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle)];
  return matrixVectorMultiply(matrix, vector);
}

xangleinput.addEventListener("input", function(){
  clearScreen();
  drawCenter();
  //Calculate new dot coordinate
  //Plot dot with angle
  rotatedCube = [];
  for (var i=0; i<cubeDots.length; i++){
    rotatedCube.push(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
    drawDot(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
  }
  drawCube(rotatedCube);
});

yangleinput.addEventListener("input", function(){
  clearScreen();
  drawCenter();
  //Calculate new dot coordinate
  //Plot dot with angle
  rotatedCube = [];
  for (var i=0; i<cubeDots.length; i++){
    rotatedCube.push(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
    drawDot(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
  }
  drawCube(rotatedCube);
});

zangleinput.addEventListener("input", function(){
  clearScreen();
  drawCenter();
  //Calculate new dot coordinate
  //Plot dot with angle
  rotatedCube = [];
  for (var i=0; i<cubeDots.length; i++){
    rotatedCube.push(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
    drawDot(rotateX(rotateY(rotateZ(cubeDots[i], zangleinput.value), yangleinput.value), xangleinput.value));
  }
  drawCube(rotatedCube);
});

function matrixVectorMultiply(matrix, vector){
  result = [
    matrix[0] * vector[0] + matrix[1] * vector[1] + matrix[2] * vector[2],
    matrix[3] * vector[0] + matrix[4] * vector[1] + matrix[5] * vector[2],
    matrix[6] * vector[0] + matrix[7] * vector[1] + matrix[8] * vector[2],
  ]
  return result;
}

drawCenter();

var square = [[-100, 100], [100, 100],
              [-100, -100], [100, -100]];

//Visualizing the cube in dots
for (var i=0; i<cubeDots.length; i++){
  drawDot(cubeDots[i]);
}

drawCube(cubeDots);

canvas.addEventListener("click", function(){
  console.log(rotatedCube);
})