var score = 0;
var gun, bluebubble, redbubble, bullet, backBoard, resetButton;
var gunImg, blueBubbleImg, redBubbleImg, bulletImg, blastImg, backBoardImg, blastSound;
var blueBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score = 0;
var gameState = 1;

function preload() {
  gunImg = loadImage("images/gun1.png");
  blastImg = loadImage("images/blast.png");
  bulletImg = loadImage("images/bullet1.png");
  blueBubbleImg = loadImage("images/waterBubble.png");
  redBubbleImg = loadImage("images/redbubble.png");
  backBoardImg = loadImage("images/back.jpg");
  blastSound = loadSound("blast.wav");
}

function setup() {
  createCanvas(800, 650);

  backBoard = createSprite(50, width/2, 100, height);
  backBoard.addImage(backBoardImg);
  
  gun = createSprite(100, height/2, 50,50);
  gun.addImage(gunImg);
  gun.scale = 0.2;
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  lifeText = createElement("h1");
  scoreboard = createElement("h1");

  resetButton = createButton("");
  resetButton.position(30, 40);
  resetButton.class("resetButton");
  resetButton.hide();

}

function draw() {
  background("#BDA297");
  
  lifeText.html("Life: " + life);
  lifeText.style('color: red'); 
  lifeText.style('font-family', 'Georgia');
  lifeText.position(150, 20);

  scoreboard.html("Score: " + score);
  scoreboard.style('color:red'); 
  scoreboard.style('font-family', 'Georgia');
  scoreboard.position(width - 200, 20);

  if(gameState === 1) {
    gun.y = mouseY; 

    textSize(20);
    fill("#E90101");
    textFont('Georgia');
    textStyle(BOLD);
    text("Hey, shoot all the bubbles.. \n else you will lose 1 life!", 290, 60);

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")) {
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)) {
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);
      blastSound.play();
    }

    if(redBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
      blastSound.play();
    }

    if(score >= 15) {
      gameState = 2;
      resetButton.show();
      handleMousePressed();
      
      swal({
        title: `Victory!!`,
        text: "Your Score is " + score,
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }

    drawSprites();
  }
    
}

function drawblueBubble() {

  bluebubble = createSprite(800, random(70, 600), 40, 40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);

}

function drawredBubble() {

  redbubble = createSprite(800, random(70, 600), 40, 40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.13;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);

}

function shootBullet() {

  bullet = createSprite(220, width/2, 50, 20);
  bullet.y = gun.y - 34;
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 7;
  bulletGroup.add(bullet);

}

function handleBubbleCollision(bubbleGroup) {
    if (life > 0) {
       score = score + 1;
    }

    blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
    blast.addImage(blastImg); 
    blast.scale = 0.3;
    blast.life = 20;
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();

}

function handleMousePressed() {
  resetButton.mousePressed(() => {
    gameState = 1;
    resetButton.hide();
    
    blueBubbleGroup.destroyEach();
    redBubbleGroup.destroyEach();
    bulletGroup.destroyEach();
  
    score = 0;
    life = 3;
  });
}


function handleGameover(bubbleGroup) {
  
    life = life - 1;
    bubbleGroup.destroyEach();
    
    if (life === 0) {
      gameState = 2;
      resetButton.show();
      handleMousePressed();
      
      swal({
        title: `Game Over!`,
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });

    }
  
}