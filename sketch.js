
let picked;

let ink;
let rectS = 85;
let pointS = 4;
let outlineSq;
let randomAng = [];
let times = 0;
let outlineCr;
let cirX,cirY;
let cirRadius = 95;
let cirAngle, step= 0;
let sprinkles = [];
let icePos;
let pinchRad;
let slice = [];

function setup() {
  createCanvas(500, 525);
  background(255);
  for (let j=0;j < 4;j++) {
    randomAng.push(random(90,105));
  }
  
  for (let k=0; k < random(10,20);k++) {
    sprinkles.push([width/2 + random(-40, 40), height/2 + random(-40, 40)])
  }
  
  pinchRad = random(5, 20);
  outlineSq = random(80,100);
  outlineCr = random(10, 20);
  icePos = random(-50,50);
  picked = random([0,1,2,3]);
}

function draw() {
  // main logo
  translate(0, -60);
  if (picked == 0) {
    makeLogo();
  }
  else if (picked == 1) {
    makeCookie();
  }
  else if (picked == 2) {
    makeCake();
  }
  else {
    makeBread();
  }
  translate(0, 60);
  fill(0);
  textSize(40);
  textFont("DM Sans");
  text("F A Y    D A", width/2 - 100, height/2 + 98);
  text("B A K E R Y", width/2 - 100, height/2 + 150);
}

function makeLogo() {
  createSqStamp();
  createSquare(rectS, 255, 50, pointS);
  createSquare(outlineSq, ink, 1, 2);
  fill(255);
  textSize(70);
  textFont("ZCOOL QingKe HuangYou");
  text("西  飛", width/2 - 65, height/2 - 15);
  text("餅  達", width/2 - 65, height/2 + 63);
}

function lineCirStamp() {
  createCirStamp(cirRadius, 800, pointS);
  createCirStamp(cirRadius+3, random(500, 700), pointS);
  createCirStamp(cirRadius+4, 800, pointS);
  createCirStamp(cirRadius-outlineCr, random(450, 550), pointS);
}

function makeCookie() {
  lineCirStamp();
  bakeCookie(48, random(500, 700), pointS);
}

function makeCake() {
  lineCirStamp();
  bakeCake();
}

function makeBread() {
  lineCirStamp();
  bakeBread();
}

function bakeBread() {
  createFilledCir(39, width/2+10,height/2-10);
  createFilledCir(40, width/2,height/2);
  createFilledCir(39, width/2-10,height/2+10);
  createPinch(pinchRad, 6);
}

function bakeCake() {
  createTri();
  createIcing();
}

function createTri() {
  for (let c=0;c < 180;c+=2) {
    createDiag(width/2 - random(0,5) - (c/5), height/2 - random(0,5) - 50 + (c/2), 50-(c/3.75), true);
  }
}

function createDiag(x,y, len, fillInk) {
  ellipse(x,y, 5,5);
  for (let b=0;b < len;b+=2) {
    ink = randomInk();
    fill(ink);
    ellipse(x+b+1,y+b,5,5);
  }
}

function createIcing(x,y,len) {
  fill(255);
  ink = randomInk();
  stroke(ink);
  strokeWeight(3);
  for (let b=0;b < 50;b+=8) {
    ellipse(width/2-1+b+0.5,height/2-51+b,12,12);
  }
  
  stroke(255);
  strokeWeight(4);
  line(width/2-20+icePos,height/2-20+icePos,width/2+25,height/2+25);
  line(width/2-40+icePos,height/2-20,width/2+5+icePos,height/2+25);
}


function createSqStamp() {
  noStroke();
  for (let i =0; i < 90;i++) {
    ink = randomInk();
    fill(ink);
    ellipse(random(width/2-randomAng[0],width/2+randomAng[1]),random(height/2-randomAng[2],height/2+randomAng[3]),pointS,pointS);
  }
}

function createSquare(size, clr, freq, s) {
 for (let j=0; j < freq;j++) {
    fill(clr);
    ellipse(width/2 - size, random(height/2 - size, height/2 + size), s, s);
    ellipse(width/2 + size, random(height/2 - size, height/2 + size), s, s);
    ellipse(random(width/2 - size, width/2 + size), height/2 - size, s, s);
    ellipse(random(width/2 - size, width/2 + size), height/2 + size, s, s);
  } 
  
}

function createCirStamp(rad, freq, s) {
  noStroke();
  if (times < freq) {
    times += 1;
    for (angleCir=step; angleCir < 2*PI+step;angleCir+=random(5)) {
      ink = randomInk();
      fill(ink);
      cirX = rad * cos(angleCir) + width/2;
      cirY = rad * sin(angleCir) + height/2;
      ellipse(cirX,cirY,s,s);
    }
  }
}

function createPinch(rad, s) {
  for (angleCir=step; angleCir < 2*PI+step;angleCir+=1.3) {
      stroke(255);
      strokeWeight(4);
      cirX = rad * cos(angleCir) + width/2;
      cirY = rad * sin(angleCir) + height/2;
      line(cirX,cirY,cirX+(5*cos(angleCir)),cirY+(5*sin(angleCir)));
    }
}

function bakeCookie(rad, freq) {
  if (times < freq) {
    times += 1
    createFilledCir(rad, width/2,height/2);
  }
  fill(255);
  for (let a=0; a < sprinkles.length;a++) {
    ellipse(sprinkles[a][0], sprinkles[a][1], 6, 6);
  }
}

function createFilledCir(rad, x, y) {
  for (let r=0; r < rad;r+=3) {
      for (angleCir=step; angleCir < 2*PI+step;angleCir+=random(5)) {
          ink = randomInk();
          fill(ink);
          cirX = r * cos(angleCir) + x;
          cirY = r * sin(angleCir) + y;
          ellipse(cirX,cirY,pointS,pointS);
      }
   }
}

function randomInk() {
  return color(random(176, 225), random(37,70), random(26,70));
}




