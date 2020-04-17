var hexagonSize = 60;
var numHexagons;

var faceOpacity = 0.1;

var colDepth = [];
var colOffset = [];

var yDist = 1;
var xDist = 1;
var probability = 0.99;

var a, b, c;

function setup() { 
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  
  strokeWeight(0.75);
  
  numHexagons=width/(hexagonSize);
  
  c = hexagonSize;
  b = hexagonSize/2;
  a = sqrt((c*c)-(b*b));
  
  for (var i = 0; i < numHexagons; i++) {
    colDepth[i] = [];
    colOffset[i] = [];
    for (var j = 0; j < numHexagons; j++) {
      colDepth[i][j] = [];
      colOffset[i][j] = random(-20, 20);
      // colOffset[i][j] = 0;
      for (var k = 0; k < 6; k++) {
        colDepth[i][j][k] = 0;
      }
    }
  }
  
  
} 

function draw() { 
  background(144, 108, 0);
  for (var i = 0; i < numHexagons; i++) {
    for (var j = 0; j < numHexagons; j++) {
      for (var k = 0; k < 6; k++) {
        // Draw first crack 
        if(colDepth[i][j][k] == 0 && random() > probability) 
          colDepth[i][j][k] += 1;
        
        // Extend column downwards
        if (colDepth[i][j][k] > 0)
          colDepth[i][j][k] += 1;
      }
      drawHexLine(i,j);
    }
  }
}

function drawHexLine(i,j) {
  var d = colDepth[i][j];
  
  var x = (j%2) ? 3*hexagonSize*i : 1.5*hexagonSize+3*hexagonSize*i;
  var y = 0.875 * j * hexagonSize;
  
  x += xDist*colOffset[i][j];
  y += yDist*colOffset[i][j];
  
  var xx = x;
  var yy = y;
  
  if (d[0]) {
    xx = x + xDist*(d[0]-1);
    yy = y + yDist*(d[0]-1);
    setOpacity(d[0]);
    line(xx, yy+2*a, xx+b-c, yy+a);
  }
  if (d[1]) {
    xx = x + xDist*(d[1]-1);
    yy = y + yDist*(d[1]-1);
    setOpacity(d[1]);
    line(xx+b-c, yy+a, xx, yy);
  }
  if (d[2]) {
    xx = x + xDist*(d[2]-1);
    yy = y + yDist*(d[2]-1);
    setOpacity(d[2]);
    line(xx, yy, xx+2*b, yy);
  }
  if (d[3]) {
    xx = x + xDist*(d[3]-1);
    yy = y + yDist*(d[3]-1);
    setOpacity(d[3]);
    line(xx+2*b, yy, xx+b+c, yy+a);
  }
  if (d[4]) {
    xx = x + xDist*(d[4]-1);
    yy = y + yDist*(d[4]-1);
    setOpacity(d[4]);
    line(xx+b+c, yy+a, xx+2*b, yy+2*a);
  }
  if (d[5]) {
    xx = x + xDist*(d[5]-1);
    yy = y + yDist*(d[5]-1);
    setOpacity(d[5]);
    line(xx+2*b, yy+2*a, xx, yy+2*a);
  }
  // Draw column face
  if (d[0]&&d[1]&&d[2]&&d[3]&&d[4]&&d[5]&&false) {
    fill('rgba(255,255,255,' + faceOpacity + ')');
    stroke('rgba(0,0,0,0.1)');
    beginShape();
    vertex(x, y+2*a);
    vertex(x+b-c, y+a);
    vertex(x, y);
    vertex(x+2*b, y);
    vertex(x+b+c, y+a);
    vertex(x+2*b, y+2*a);
    endShape(CLOSE);
    faceOpacity += 0.1
  }
}

function setOpacity(val) {
  // var opacity = 1/(val) + 1/(val*val);
  var opacity = 1/(1.5*val) + 1/(val*val*val);
  stroke('rgba(0,0,0,' + opacity + ')');
}
