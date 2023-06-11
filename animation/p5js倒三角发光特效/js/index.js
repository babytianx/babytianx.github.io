var triPoints = [
[0, 120],
[120, -120],
[-120, -120]];


var dots = [];
var beginningColor = void 0;
var endColor = void 0;
var triGradient = void 0;
var increment = 1.0 / 30;
var fonty = void 0;


function Dot(position) {
  this.position = position;
  this.velocityX = random(0.5, 3);
  this.velocityY = random(0.5, 3);
  this.size = random(10);
  this.life = 255;

  this.draw = function () {
    fill(167, 220, 255, this.life);
    this.life -= 10;
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };

  this.update = function () {
    if (this.position.y > -10 && this.position.y < 10) {
      if (this.position.x < 0) {
        this.position.x -= this.velocityX;
        this.position.y -= 0.25;
      } else {
        this.position.x += this.velocityY;
        this.position.y += 0.25;
      }

    } else {
      if (this.position.x < 0 && this.position.y < 0) {
        this.position.x -= this.velocityX;
        this.position.y -= this.velocityY;
      }

      if (this.position.x < 0 && this.position.y > 0) {
        this.position.x -= this.velocityX;
        this.position.y += this.velocityY;
      }

      if (this.position.x > 0 && this.position.y > 0) {
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
      }

      if (this.position.x > 0 && this.position.y < 0) {
        this.position.x += this.velocityX;
        this.position.y -= this.velocityY;
      }
    }
  };
}


function setup() {
  createCanvas(400, 400);
  beginningColor = color(0, 0, 0);
  endColor = color(15, 97, 138, 166);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  fill(endColor);
  stroke(0);

  triangle(
  triPoints[0][0], triPoints[0][1],
  triPoints[1][0], triPoints[1][1],
  triPoints[2][0], triPoints[2][1]);


  drawThreeTriangles();

  cleanUpDots();var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = dots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {d = _step.value;
      d.update();
      d.draw();
    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}};

  generateDots(10);

  textFont('Roboto');
  textAlign(CENTER);
  textSize(120);
  fill(255);
  text('S', 0, 5);
}

function cleanUpDots() {
  dots = dots.filter(function (d) {return d.life > 0;});
}

function drawThreeTriangles() {
  for (var i = 0; i < triPoints.length; i++) {
    var lerpy = 0.0;

    for (var j = 0; j < 30; j++) {
      push();
      var lc = lerpColor(beginningColor, endColor, lerpy);


      switch (i) {
        case 0:
          translate(triPoints[i][0], triPoints[i][1]);
          rotate(PI);
          break;
        case 1:
          translate(triPoints[i][0] + 5, triPoints[i][1]);
          rotate(QUARTER_PI + .28);
          break;
        case 2:
          translate(triPoints[i][0] - 5, triPoints[i][1]);
          rotate(-QUARTER_PI - .28);
          break;}


      stroke(lc);
      strokeWeight(2);
      line(0 - j, 0 + j * 2, 1 + j, 0 + j * 2);

      pop();
      lerpy += increment - 0.01;
    }
  }
}

function generateDots(n) {

  for (var i = 0; i < n; i++) {
    var startDest = random(triPoints);
    var endDest = random(triPoints);
    var lerpy = random(0, 1);

    while (startDest === endDest) {
      endDest = random(triPoints);
    }

    dots.push(new Dot(
    createVector(
    lerp(startDest[0], endDest[0], lerpy),
    lerp(startDest[1], endDest[1], lerpy))));


  }
}