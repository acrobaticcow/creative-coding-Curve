let x1, y1, x2, y2, x3, y3, x4, y4;
const pW = 5;
let cP1Changing, cP2Changing;

/**
 * @type {p5.Vector[]} p - An array of p5.Vector objects representing points.
 */
let p;
let iChanging = -1;
let hide;

function setup() {
  createCanvas(400, 400);

  let aP1 = createVector(0, 0);
  let cP1 = createVector(0, 0);
  let cP2 = createVector(0, 0);
  let aP2 = createVector(0, 0);

  x1 = aP1.x;
  y1 = aP1.y;
  x2 = cP1.x;
  y2 = cP1.y;
  x3 = cP2.x;
  y3 = cP2.y;
  x4 = aP2.x;
  y4 = aP2.y;

  cP1Changing = cP2Changing = false;

  p = [];
  pB = [];

  hide = false;
}

function draw() {
  background(220);

  push();
  fill("black");
  ellipse(mouseX, mouseY, pW);
  pop();

  // display dot
  if (!hide)
    p.forEach((e, i) => {
      push();
      fill("black");
      ellipse(e.x, e.y, pW);
      if (i > 0) {
        stroke("#F5F5F5");
        drawingContext.setLineDash([5, 5]);
        line(p[i - 1].x, p[i - 1].y, e.x, e.y);
      }
      pop();
    });

  // draw single point curve
  if (p.length > 0) {
    push();
    noFill();
    beginShape();
    for (let i = 0; i < p.length - 1; i++) {
      if (i === 0) vertex(p[0].x, p[0].y);

      const mP = createVector(
        p[i].x + (p[i + 1].x - p[i].x) / 2,
        p[i].y + (p[i + 1].y - p[i].y) / 2
      );

      if (i === p.length - 2) {
        quadraticVertex(p[i].x, p[i].y, p[i + 1].x, p[i + 1].y);
      } else if (i > 0) quadraticVertex(p[i].x, p[i].y, mP.x, mP.y);
    }
    endShape();
    pop();
  }
}

// function mouseClicked() {
//     assignBezierP();
// }

// * Bezier multi-point curve
function drawCurve() {
  if (x2 && y2 && x3 && y3 && x4 && y4) {
    push();
    noFill();
    beginShape();
    vertex(x1, y1);
    bezierVertex(x2, y2, x3, y3, x4, y4);
    endShape();
    pop();
  }
}

function displayP() {
  push();
  if (!x1 && !y1) {
    fill("black");
    ellipse(mouseX, mouseY, pW);
  } else if (!x2 && !y2) {
    fill("red");
    ellipse(mouseX, mouseY, pW);
  } else if (!x3 && !y3) {
    fill("red");
    ellipse(mouseX, mouseY, pW);
  } else if (!x4 && !y4) {
    fill("black");
    ellipse(mouseX, mouseY, pW);
  } else {
  }
  pop();

  if (x1 && y1) {
    fill("black");
    ellipse(x1, y1, pW);
  }
  if (x2 && y2) {
    fill("red");
    ellipse(x2, y2, pW);
  }
  if (x3 && y3) {
    fill("red");
    ellipse(x3, y3, pW);
  }
  if (x4 && y4) {
    fill("black");
    ellipse(x4, y4, pW);
  }

  if (x1 && y1 && x2 && y2 && x3 && y3 && x4 && y4) {
    push();
    stroke("red");
    line(x2, y2, x1, y1);
    drawingContext.setLineDash([5, 5]);
    line(x2, y2, x4, y4);
    pop();

    push();
    stroke("red");
    line(x3, y3, x4, y4);
    drawingContext.setLineDash([5, 5]);
    line(x3, y3, x1, y1);
    pop();
  }
}

function assignBezierP() {
  if (!x1 && !y1) {
    x1 = mouseX;
    y1 = mouseY;
  } else if (!x2 && !y2) {
    x2 = mouseX;
    y2 = mouseY;
  } else if (!x3 && !y3) {
    x3 = mouseX;
    y3 = mouseY;
  } else if (!x4 && !y4) {
    x4 = mouseX;
    y4 = mouseY;
  } else {
  }
}

// Start changing the first control point if the user clicks near it.
function mousePressed() {
  //   if (dist(mouseX, mouseY, x2, y2) < pW + 5) {
  //     cP1Changing = true;
  //   } else if (dist(mouseX, mouseY, x3, y3) < pW + 5) {
  //     cP2Changing = true;
  //   }

  p.forEach((e, i) => {
    if (dist(mouseX, mouseY, e.x, e.y) < pW + 5) {
      iChanging = i;
      return;
    }
  });

  if (iChanging < 0) {
    p.push(createVector(mouseX, mouseY));
  }
}

function keyPressed() {
  if (key === "h") {
    hide = !hide;
  }
  if (key === "c") {
    p = [];
    iChanging = -1;
  }
  if (key === "d") {
    if (p.length > 0) {
      p.pop();
      iChanging = -1;
    }
  }
}

// Stop changing the first control point when the user releases the mouse.
function mouseReleased() {
  //   cP1Changing = cP2Changing = false;

  iChanging = -1;
}

// Update the first control point while the user drags the mouse.
function mouseDragged() {
  //   if (cP1Changing === true) {
  //     x2 = mouseX;
  //     y2 = mouseY;
  //   }
  //   if (cP2Changing === true) {
  //     x3 = mouseX;
  //     y3 = mouseY;
  //   }
  if (iChanging >= 0) {
    p[iChanging].x = mouseX;
    p[iChanging].y = mouseY;
  }
}
