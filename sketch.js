// Declaring variables for the game
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg, gameOver, gameOverImg;

var redBubbleGroup, redBubbleGroup, bulletGroup, SpiderMasterMind,SpiderMasterMindImg, SpiderMasterMindGroup;

var samuelHayden, samuelHaydenImg, samuelHaydenDestroyed;

var extraLife,extraLifeImg, extraLifeGroup;

var edge;
var life = 1;
var score=0;
var gameState=1
var sound, painSound,BFGSound;

function preload(){
  //Loading images and sounds
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("marsBackGround.jpg")
  samuelHaydenImg = loadImage("samuelHayden.webp")
  samuelHaydenDestroyed = loadImage("samuelHaydenDestroyed.webp")
  gameOverImg = loadImage("gameOver.png")
  sound = loadSound("./BFG10K.mp3");
  painSound = loadSound("unf.mp3")
  BFGSound = loadSound("BFGSound.mp3")
  SpiderMasterMindImg = loadImage("spider_mastermind.png")
  extraLifeImg = loadImage("Invulnerability_anim.webp")
}
function setup() {
  //setting up game
  createCanvas(windowWidth, windowHeight);
  edge = createEdgeSprites();
  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(200, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2

  samuelHayden = createSprite(50,width/2,100,100)
  samuelHayden.addImage(samuelHaydenImg)
  samuelHayden.scale = 0.1

  gameOver = createSprite(600,300,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5
  gameOver.visible = false;
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  SpiderMasterMindGroup = createGroup();
  extraLifeGroup = createGroup();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
  //background audio
  sound.loop();
  sound.setVolume(0.5)
}

function draw() {
  //scoreBoard
  heading.html("Life: "+life)
  heading.style('color:white'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)
// gameState is play
  if(gameState===1){
    gun.y=mouseY  
    samuelHayden.y = mouseY

    if (frameCount % 150 === 0) {
      drawblueBubble();
    }

    if (frameCount % 200 === 0) {
      drawredBubble();
    }

    if(frameCount % 120 === 0){
      drawSpiderMasterMind()
    }

    if (frameCount % 500 === 0){
      drawExtraLife()
    }

    if(keyWentDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(samuelHayden && edge[0])){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(samuelHayden && edge[0])) {
      handleGameover(redBubbleGroup);
    }

    if (extraLifeGroup.collide(samuelHayden)) {
      addLife();
      handleBubbleCollision(extraLifeGroup)
    }

    if (SpiderMasterMindGroup.collide(samuelHayden && edge[0])) {
      handleGameover(SpiderMasterMindGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(SpiderMasterMindGroup.collide(bulletGroup)){
      handleBubbleCollision(SpiderMasterMindGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    // adding infinite bullets powerup when score is hundred
    if(score === 100){
      gameState = 3
    }
    drawSprites();
  }

// infinite bullets powerup
    if (gameState=== 3){
      gun.y=mouseY  
    samuelHayden.y = mouseY

    if (frameCount % 150 === 0) {
      drawblueBubble();
    }

    if (frameCount % 200 === 0) {
      drawredBubble();
    }

    if(frameCount % 120 === 0){
      drawSpiderMasterMind()
    }

    if (frameCount % 500 === 0){
      drawExtraLife()
    }
      if (keyDown("space")){
        shootBullet();
      }
      if (blueBubbleGroup.collide(samuelHayden && edge[0])){
        handleGameover(blueBubbleGroup);
      }
      
      if (redBubbleGroup.collide(samuelHayden && edge[0])) {
        handleGameover(redBubbleGroup);
      }
  
      if (extraLifeGroup.collide(samuelHayden)) {
        addLife();
        handleBubbleCollision(extraLifeGroup)
      }
  
      if (SpiderMasterMindGroup.collide(samuelHayden && edge[0])) {
        handleGameover(SpiderMasterMindGroup);
      }
      
      if(blueBubbleGroup.collide(bulletGroup)){
        handleBubbleCollision(blueBubbleGroup);
      }
  
      if(SpiderMasterMindGroup.collide(bulletGroup)){
        handleBubbleCollision(SpiderMasterMindGroup);
      }
  
      if(redBubbleGroup.collide(bulletGroup)){
        handleBubbleCollision(redBubbleGroup);
      }
      drawSprites()
    }
    // stopping various things when life reaches 0
    if(gameState === 2){
      bulletGroup.destroyEach()
      blueBubbleGroup.destroyEach()
      redBubbleGroup.destroyEach()
      SpiderMasterMindGroup.destroyEach()
      extraLifeGroup.destroyEach()
      gameOver.visible= true;
      sound = sound.stop()
      painSound = painSound.stop()
      BFGSound = BFGSound.stop()
      drawSprites()
    }
}
// creating enemies
function drawblueBubble(){
  bluebubble = createSprite(windowWidth,random(180,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 1;
  bluebubble.velocityX = random(-5,-15);
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(windowWidth,random(180,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 1;
  redbubble.velocityX =  random(-5,-15);
  redbubble.lifetime = 400;
  console.log(redbubble.y);
  redBubbleGroup.add(redbubble);
}

function drawSpiderMasterMind(){
  SpiderMasterMind = createSprite(windowWidth,random(180,780),40,40);
  SpiderMasterMind.addImage(SpiderMasterMindImg);
  SpiderMasterMind.scale = 1;
  SpiderMasterMind.velocityX =  random(-5,-15);
  SpiderMasterMind.lifetime = 400;
  SpiderMasterMindGroup.add(SpiderMasterMind);
}
// creating powerup
function drawExtraLife(){
  extraLife = createSprite(windowWidth,random(180,780),40,40);
  extraLife.addImage(extraLifeImg);
  extraLife.scale = 0.3;
  extraLife.velocityX =-17;
  extraLife.lifetime = 400;
  extraLifeGroup.add(extraLife)
}
// adding the ability to shoot bullets
function shootBullet(){
  bullet= createSprite(297, width/2, 50,20)
  bullet.y= gun.y+16
  bullet.addImage(bulletImg)
  BFGSound.loop()
  BFGSound.setVolume(0.4)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}
// defining what the powerup does
function addLife(){
  life = life + 5;
}
// what happens when the bullet touches the enemies
function handleBubbleCollision(bubbleGroup,SpiderMasterMindGroup,extraLifeGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}
//what happes when the enemies touch the player
function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    paindSound = painSound.play()
    

    if (life === 0) {
      gameState=2
    }
}