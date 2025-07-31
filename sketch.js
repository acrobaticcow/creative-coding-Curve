class Curve {
  constructor() {
    this.points = [];
    this.iChanging = -1;
    this.hide = false;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.x3 = 0;
    this.y3 = 0;
    this.x4 = 0;
    this.y4 = 0;
    this.pW = 5;
  }

  draw() {
    push();
    fill("black");
    ellipse(mouseX, mouseY, this.pW);
    pop();

    // display dot
    if (!this.hide)
      this.points.forEach((e, i) => {
        push();
        fill("black");
        ellipse(e.x, e.y, this.pW);
        if (i > 0) {
          stroke("#F5F5F5");
          drawingContext.setLineDash([5, 5]);
          line(this.points[i - 1].x, this.points[i - 1].y, e.x, e.y);
        }
        pop();
      });

    // draw single point curve
    if (this.points.length > 0) {
      push();
      noFill();
      beginShape();
      for (let i = 0; i < this.points.length - 1; i++) {
        if (i === 0) vertex(this.points[0].x, this.points[0].y);

        const mP = createVector(
          this.points[i].x + (this.points[i + 1].x - this.points[i].x) / 2,
          this.points[i].y + (this.points[i + 1].y - this.points[i].y) / 2
        );

        if (i === this.points.length - 2) {
          quadraticVertex(
            this.points[i].x,
            this.points[i].y,
            this.points[i + 1].x,
            this.points[i + 1].y
          );
        } else if (i > 0)
          quadraticVertex(this.points[i].x, this.points[i].y, mP.x, mP.y);
      }
      endShape();
      pop();
    }
  }

  // * Bezier multi-point curve
  drawBezierCurve() {
    if (this.x2 && this.y2 && this.x3 && this.y3 && this.x4 && this.y4) {
      push();
      noFill();
      beginShape();
      vertex(this.x1, this.y1);
      bezierVertex(this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
      endShape();
      pop();
    }
  }

  displayPoints() {
    push();
    if (!this.x1 && !this.y1) {
      fill("black");
      ellipse(mouseX, mouseY, this.pW);
    } else if (!this.x2 && !this.y2) {
      fill("red");
      ellipse(mouseX, mouseY, this.pW);
    } else if (!this.x3 && !this.y3) {
      fill("red");
      ellipse(mouseX, mouseY, this.pW);
    } else if (!this.x4 && !this.y4) {
      fill("black");
      ellipse(mouseX, mouseY, this.pW);
    }
    pop();

    if (this.x1 && this.y1) {
      fill("black");
      ellipse(this.x1, this.y1, this.pW);
    }
    if (this.x2 && this.y2) {
      fill("red");
      ellipse(this.x2, this.y2, this.pW);
    }
    if (this.x3 && this.y3) {
      fill("red");
      ellipse(this.x3, this.y3, this.pW);
    }
    if (this.x4 && this.y4) {
      fill("black");
      ellipse(this.x4, this.y4, this.pW);
    }

    if (
      this.x1 &&
      this.y1 &&
      this.x2 &&
      this.y2 &&
      this.x3 &&
      this.y3 &&
      this.x4 &&
      this.y4
    ) {
      push();
      stroke("red");
      line(this.x2, this.y2, this.x1, this.y1);
      drawingContext.setLineDash([5, 5]);
      line(this.x2, this.y2, this.x4, this.y4);
      pop();

      push();
      stroke("red");
      line(this.x3, this.y3, this.x4, this.y4);
      drawingContext.setLineDash([5, 5]);
      line(this.x3, this.y3, this.x1, this.y1);
      pop();
    }
  }

  mousePressed() {
    this.points.forEach((e, i) => {
      if (dist(mouseX, mouseY, e.x, e.y) < 10) {
        this.iChanging = i;
        return;
      }
    });

    if (this.iChanging < 0) {
      this.points.push(createVector(mouseX, mouseY));
    }
  }

  keyPressed() {
    if (key === "h") {
      this.hide = !this.hide;
    }
    if (key === "c") {
      this.points = [];
      this.iChanging = -1;
    }
    if (key === "d") {
      if (this.points.length > 0) {
        this.points.pop();
        this.iChanging = -1;
      }
    }
  }

  // Stop changing the first control point when the user releases the mouse.
  mouseReleased() {
    this.iChanging = -1;
  }

  // Update the first control point while the user drags the mouse.
  mouseDragged() {
    if (this.iChanging >= 0) {
      this.points[this.iChanging].x = mouseX;
      this.points[this.iChanging].y = mouseY;
    }
  }
}

/**
 * @type {Curve}
 */
let curve;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  curve = new Curve();
}

function draw() {
  background(220);
  curve.draw();
}
