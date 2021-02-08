var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fairy, fairyImg;
var ground;
var bg, bgImg;

var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  bgImg = loadImage("forest.png");

  fairyImg = loadImage("green.png");
    
  obstacle1 = loadImage("flower1.png");
  obstacle2 = loadImage("flower2.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  bg = createSprite(300,100,1000,10);
  bg.addImage(bgImg);
  bg.scale = 1;
  
  fairy = createSprite(50,180,20,50);
  
  fairy.addImage(fairyImg);
  fairy.scale = 0.5;
  fairy.debug;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  ground = createSprite(200,190,400,10);
  ground.visible = false;

  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white"); 

  stroke("red");
  text("Score: "+ score, 500,50); 
  
  if(bg.x<0)
  {
    bg.x = width/2;
  }
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && fairy.y >= 159) {
      fairy.velocityY = -12;
    }
  
    fairy.velocityY = fairy.velocityY + 0.8

    bg.velocityX = -(6 + 3*score/100);
  
    fairy.collide(ground);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(fairy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    fairy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    bg.velocityX = 0;
  
    obstaclesGroup.setLifetimeEach(-1);
      
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);

    obstacle.velocityX = -(6 + 3*score/100);
  
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;     
      default: break;
    }
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
 
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
    
  score = 0;
  
}