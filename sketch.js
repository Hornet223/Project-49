var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var heart1Img, heart2Img, heart3Img;
var explosion_sound, lose_sound, win_sound;
var bat;
var bullet = 70;
var score = 0;
var bulletGroup;
var gameState = "fight";
var heart1, heart2, heart3;
life = 3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  
  explosion_sound = loadSound("assets/explosion.mp3")
  lose_sound = loadSound("assets/lose.mp3")
  win_sound = loadSound("assets/win.mp3")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  batImg = loadAnimation("assets/bat1_png.png", "assets/bat2.0_png.png")
  bulletImg = loadImage("assets/bullet.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bat = createSprite(565, 80);
   bat.addAnimation("bat", batImg);
   bat.scale = 0.5;
   bat.frameDelay = 10;

   bullet = createSprite(player.x, player.y, 20, 10);
   bullet.visible = false;
   heart1 = createSprite(displayWidth - 700, 40, 20, 20);
   heart1.visible = false;
   heart1.addImage(heart1Img);
   heart1.scale = 0.4;
   
   heart2 = createSprite(displayWidth - 500, 40, 20, 20);
   heart2.visible = false;
   heart2.addImage(heart2Img);
   heart2.scale = 0.4;

   heart3 = createSprite(displayWidth - 300, 40, 20, 20);
   heart3.visible = false;
   heart3.addImage(heart3Img);
   heart3.scale = 0.4;
   
   bulletGroup = new Group();
   zombieGroup = new Group();
}

function draw() {
  background(0); 
  if (gameState === "fight"){
    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  
    //go to gameState "lost" when 0 lives are remaining
    if(life===0){
      gameState = "lost"
      
    }
  
    if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){     
          
       if(zombieGroup[i].isTouching(bulletGroup)){
            zombieGroup[i].destroy()
            bulletGroup.destroyEach()
            explosion_sound.play();
     
            score = score+2
            } 
      
      }
    }
    

    if(zombieGroup.isTouching(player)){
 
      lose_sound.play();
    
   
    for(var i=0;i<zombieGroup.length;i++){     
         
     if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
         
         life=life-1
          } 
    
    }
   }

    
  
 }  


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth ++ 
    bullet -= 1
    explosion_sound.play()
  // player.changeImage(shooter_shooting)
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//player goes back to original standing image once we stop pressing the space bar
if (bullet == 0){
  gameState = "bullet"
  lose_sound.play();
}


spawnZombies()

drawSprites();

textSize(20)
  fill("white")
text("Bullet = " + bullet,displayWidth-350,displayHeight/2-200)
text("Score = " + score,displayWidth-340,displayHeight/2-170)
text("Lives = " + life,displayWidth-340,displayHeight/2-280)


if(gameState == "lost"){
  textSize(100);
  fill("red")
  text("You Lost", 700, 300);
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState == "won"){
  fill("yellow");
  textSize(100);
  text("You WON!", 700, 300);
  zombieGroup.destroyEach();
  player.destroy();
}
else if(gameState == "bullet"){
  fill("yellow");
  textSize(50);
  text("You have run out of bullets", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}


function spawnZombies(){
  if(frameCount % 80 === 0){
    var zombie = createSprite(windowWidth - 50, random(400,700),50,50);
    zombie.addImage(zombieImg);
    zombie.velocityX = -8;
    zombie.scale = 0.15;
    zombie.setCollider("rectangle",0,0);
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}

}