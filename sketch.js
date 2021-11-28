var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup, gameOver;

var score = 0;
var life = 3;
var bullets = 70;

var heart1, heart2, heart3, restartImg, restart4;

var gameState = "fight"


var lose, winning, explosionSound;
var zombie2, zombie3, zombie4;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  restartImg = loadImage("assets/restart.png")
  bulletImg = loadImage("assets/bullet.png")

  zombieImg = loadImage("assets/zombie.png")
  zombie2 = loadImage("assets/zombie2.png")
  zombie3 = loadImage("assets/zombie3.png")
  zombie4 = loadImage("assets/zombie4.png")


  bgImg = loadImage("assets/bg.jpeg")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  laughSound = loadSound("assets/laugh.mp3")


}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2+100,displayHeight/2+50,20,20)
bg.addImage(bgImg)
bg.scale = 1.3
restart4 = createSprite(755,314,50,50);
restart4.visible=false;


player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  // player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 



if(gameState === "fight"){

  if(life===3)
  {
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }

  if(life===2)
  {
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }

  if(life===1)
  {
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  if(life===0){
    gameState = "lost"
    
  }


  if(score==100){
    gameState = "won"
    winning.play();
  }

  

  if(frameCount % 100 === 0){
    laughSound.play()
  }


if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.05
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
  explosionSound.play();
}

else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullets==0){
  gameState = "bullet"
  lose.play();
    
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

if(zombieGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}




/*if(mousePressedOver(restart4)){

  restart()
  
}*/

enemy();
}


if(zombieGroup.x >= 240){

  score = score -2;

}

drawSprites();


textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)
fill("black")
textSize(35)
text("Press space key to shoot!! " , 650, 125)



//text(mouseX+","+mouseY,mouseX,mouseY);


if(gameState == "lost"){

  textSize(100)
  fill("white")
  text("You Lost ",600,450)
  heart1.visible = false
 /*restart4.visible=true
  restart4.addImage(restartImg)*/

  zombieGroup.destroyEach();
  player.destroy();

}


else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)

  zombieGroup.destroyEach();
  player.destroy();

}


else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


function enemy(){
  if(frameCount%150 ===0){

    zombie = createSprite(random(700,900),random(400,700),40,40)

    var rand = Math.round(random(1,3));

    switch(rand) {
      case 1: zombie.addImage(zombie2);
              break;
      case 2: zombie.addImage(zombie3);
              break;
     case 3: zombie.addImage(zombie4);
             break;
      default: break;
    }

    zombie.scale = 0.4
    zombie.velocityX = -3
    //zombie.debug= true

    zombie.setCollider("rectangle",0,0,400,400)
  

   
    zombie.lifetime = 400
   zombieGroup.add(zombie)

  }

  
    
  }
  
 /* function restart(){

  gameState = "fight"
  restart4.visible = false
 // gameState !== "lost";
  score = 0
  

  }*/

