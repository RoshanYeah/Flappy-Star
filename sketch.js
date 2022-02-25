var sea;
var seaImg,patrickImg;
var edges;
var invisibleground
var patrick;
var pipe,pipeImg;
var pipetTop,pipeTopImg;
var pipesGroup,pipeTopGroup;
var PLAY=1
var END=0
var START=2
var gameState=START
var gameOver,gameOverImg;
var restart,restartImg;
var score=0;
var start,startImg;
var settings,settingsImg;

function preload(){
  
  pipesGroup = new Group()
  pipeTopGroup = new Group()

  patrickImg = loadAnimation("patrick.png")
  seaImg = loadImage("sea.png");
  pipeImg = loadImage("flappy-bird-pipes.png")
  pipeTopImg = loadImage("flappy-bird-pipes-top.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  startImg = loadImage("press-space-to-start.png")
  settingsImg = loadImage("settings.png")
}

function setup(){
  createCanvas(400,400);
  background("blue");

  sea=createSprite(400,200);
  sea.addImage(seaImg);
  sea.velocityX = -5;
  sea.scale=0.3;

  edges = createEdgeSprites()

  patrick = createSprite(130,200,30,30)
  patrick.addAnimation("flyingPatrick",patrickImg)
  patrick.scale =0.04

  invisibleground=createSprite(200,400,400,20)
  invisibleground.visible = false

  gameOver = createSprite(200,200)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.7

  restart = createSprite(200,250)
  restart.addImage(restartImg)
  restart.scale=0.7

  start = createSprite(200,200)
  start.addImage(startImg)
  start.scale=0.2

  settings = createSprite(20,20)
  settings.addImage(settingsImg)
  settings.scale=0.05
}



function draw() {
  background(0);
  textSize(20)
  fill("orange")
  text("Score: "+ score,150,150)

  if(patrick.isTouching(invisibleground)){
    patrick.collide(invisibleground)
  }
  //console.log("this is", gameState)

  if(gameState===START){
    
    sea.velocityX = -3;

    if(sea.x < 0){
     sea.x = sea.width/8;
    }

    patrick.velocityY=0

    gameOver.visible=false
    restart.visible=false
    start.visible=true
    settings.visible=true
    sea.visible=true
    patrick.visible=false

    if(keyDown("space")){
      gameState=PLAY
    }

  }
  else if(gameState===PLAY){

    score = score + Math.round(getFrameRate()/60)
    sea.velocityX = -(3 + 3*score/100)

    sea.velocityX = -3;

    if(sea.x < 0){
     sea.x = sea.width/8;
    }

    if(keyDown("space")){
      patrick.velocityY = -7
    }
  
    patrick.velocityY = patrick.velocityY+0.7
    patrick.collide(edges)
    gameOver.visible = false
    restart.visible=false
    start.visible=false
    settings.visible=true
    patrick.visible=true

    spawnPipes()
    spawnPipeTop()

    if(pipesGroup.isTouching(patrick)){
      gameState=END
    }
 
    if(pipeTopGroup.isTouching(patrick)){
      gameState=END
    }

  }
  else if(gameState===END){
    sea.velocityX=0
    gameOver.visible=true
    restart.visible=true
    start.visible=false
    settings.visible=true
    sea.visible=false
    patrick.visible=false
    pipesGroup.setVelocityXEach(0)
    pipeTopGroup.setVelocityXEach(0)
   pipesGroup.destroyEach()
   pipeTopGroup.destroyEach()
    patrick.velocityY=0

    if(mousePressedOver(restart)){
      reset()
    }
    
  }



  drawSprites();
}

function spawnPipes(){
if(frameCount%75===0){
  pipe=createSprite(400,350,40,200)
pipe.addImage(pipeImg)
pipe.y = Math.round(random(350,400))
pipe.velocityX=-3
pipe.scale = 0.3
//console.log(frameCount)
pipe.lifetime = 133
pipesGroup.add(pipe)
pipesGroup.depth=gameOver.depth
gameOver.depth=gameOver.depth +1
pipesGroup.depth=restart.depth
restart.depth=restart.depth +1
pipesGroup.velocityX = -(3 + 3*score/100)
}
}

function spawnPipeTop(){
  if(frameCount%75===0){
    pipeTop=createSprite(400,100,40,200)
  pipeTop.addImage(pipeTopImg)
  pipeTop.y = Math.round(random(10,60))
  pipeTop.velocityX=-3
  pipeTop.scale = 0.3
  //console.log(frameCount)
  pipeTop.lifetime = 133
  pipeTopGroup.add(pipeTop)
  pipeTopGroup.depth=gameOver.depth
  gameOver.depth=gameOver.depth +1
  pipeTopGroup.depth=restart.depth
  restart.depth=restart.depth +1
  pipeTopGroup.velocityX = -(3 + 3*score/100)
  }
  }

  function reset(){
    gameState=START
    gameOver.visible=false
    restart.visible=false
    pipeTopGroup.destroyEach()
    pipesGroup.destroyEach()
    score=0
  }