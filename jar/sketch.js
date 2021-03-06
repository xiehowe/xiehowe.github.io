var imgWidth=1024;
var imageNumber;
var n, touched, fixImage;

var start=1;
var finish=115;

var nImages=finish-start;
var imgs = [];
var light;
var xlight;

var hotAreaLeftW=650, hotAreaLeftH=550, hotAreaLeftX=190, hotAreaLeftY=0;

var r,w;

function preload() {
  light=loadImage("light.png");
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/jar_"+str(i)+".jpg");
  }
}

function setup() {
  if (windowWidth>imgWidth) {
    createCanvas(imgWidth, imgWidth*9/16);
    r=1;
  }
  else {
    r=windowWidth/imgWidth;
    createCanvas(windowWidth, windowWidth*9/16);
  }
  touched=0;
}

function draw() {
  var down=touchIsDown || mouseIsPressed;
  
  if (down === false){
    if (touched===1) {
    imageNumber=fixImage;
    c=color('rgba(255,255,255,0)');
    }
    if (touched===0) {
    imageNumber=0;
    xlight=r*(hotAreaLeftX-33);
    c=color('rgba(255,255,255,0.5)');
    }
  }
  
  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  image(light,xlight,-1,r*65,r*108);
  noStroke();
  rect(hotAreaLeftX*r,-1,hotAreaLeftW*r,6*r)
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(touchX-r*hotAreaLeftX)/(r*hotAreaLeftW);
  fixImage=imageNumber;
  xlight=touchX-r*33;
  c=color('rgba(255,255,255,0)');
  touched=1;
  }
  return false;
}

function windowResized() {
  w=width;
  if (windowWidth>imgWidth) {
  resizeCanvas(imgWidth, imgWidth*9/16);
  r=1;
  }
  else {
    r=windowWidth/imgWidth;
    resizeCanvas(windowWidth, windowWidth*9/16);
  }
  xlight = xlight * width/w;
}


