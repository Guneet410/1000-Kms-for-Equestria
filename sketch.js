var bg, bgImg1,bgImg2,bgImg3,bgImg4;
var player,playerImg;
var play = 1;
var start = 2;
var lost = 3;
var gamestate = start;
var score = 0;
var hearts = 3;
var rScore = 0
var won = 4;

var scoreForArrow = false;
var scoreForSpike = false;
var scoreForStone = false;
 

function preload() {
bgImg1 = loadImage("assets/bg1.jpg");
bgImg2 = loadImage("assets/bg2.jpg")
bgImg3 = loadImage("assets/bg3.jpg")
bgImg4 = loadImage("assets/lastbg.jpg");
startImg = loadImage("assets/scroll.png");
winImg = loadImage("assets/scroll2.png");
fireImg = loadImage("assets/fire.png")
arrowImg = loadImage("assets/arrow.png")
jump = loadImage("assets/wolf2.png")

grassImg = loadImage("assets/grass-removebg-preview.png");
liveImg = loadImage("assets/life.png")
spikes = loadImage("assets/spikes.png")
stone = loadImage("assets/stone.png")
gemImg = loadImage("assets/gem.png")
//lostpic = loadImage("assets/snake.jpg")
player2 = loadImage("assets/wolf2.png")

playerImg = loadAnimation("assets/wolf1.png","assets/p3.png","assets/wolf2.png")
dragonImg = loadAnimation("assets/dragon1.png","assets/dragon2.png")
dargonLost = loadImage("assets/dragon1.png")

ouch = loadSound("ouch.mp4");
gemS = loadSound("gem.mp4")
arwowS = loadSound("arrow.mp3")
themeS = loadSound("sky.mp4")
loseS = loadSound("lostttt.wav")
}

function setup() {
  createCanvas(700,400);

  themeS.play();
  themeS.loop = true;
  themeS.setVolume(0.25)
  
  bg = createSprite(350,200,400,20);
  bg.addImage("1",bgImg1);
  bg.scale = 3
  bg.velocityX = -2;
  bg.addImage("2",bgImg2)
  bg.addImage("3",bgImg3)
  bg.addImage("4",bgImg4)
 
  player = createSprite(200,370,50,20)
  player.addAnimation("run",playerImg)
  player.scale = 0.5
  player.setCollider("rectangle",0,0,player.width-300,player.height-300);
  player.addImage("jump",jump);
  player.addImage("player2", player2)

  ground = createSprite(350,390,1000,10)
 ground.addImage("grass",grassImg);
  ground.scale= 2.3
  


ground.setCollider("rectangle",0,0,ground.width, ground.height - 10)

live1 = createSprite(50,50,20,20)
live1.addImage("life1",liveImg)
live1.scale = 0.1

live2 = createSprite(100,50,20,20)
live2.addImage("life2",liveImg)
live2.scale = 0.1

live3 = createSprite(150,50,20,20)
live3.addImage("life3",liveImg)
live3.scale = 0.1


Dgroup = new Group();
Agroup = new Group();
Sgroup = new Group();
StGroup = new Group();
Rgroup = new Group();
}




function draw() {
  background("black");  

  //start
  if(gamestate === start){
  imageMode(CENTER);
  image(bgImg4,width/2,height/2,700,500)
  image(startImg,width/2- 10,height/2,500,400)
  image(fireImg,width/2 -10,height/2,1500,700)

    
  if(keyDown("s")){
    gamestate = play;
  }}

  //play
  if(gamestate === play){
  
    if(bg.x < 270){
    bg.x = 350
  }
  
         
  
 
   if(hearts === 2){
     live3.visible = false;
     }
    
   if(hearts === 1){
    live2.visible = false;
     } 
  
     if(hearts === 0){
    live1.visible = false;
    gamestate = lost;
    loseS.play();
    themeS.stop();
    allLivesGone();
    }
  
  


if(keyDown("space") && player.y >200){
    player.velocityY= -10; 
    player.changeAnimation("jump",jump)
  }
  if(player.isTouching(ground)){
    player.changeAnimation("run",playerImg);
  }
  player.velocityY += 0.5


  score = score + Math.round(getFrameRate()/60);
  if(player.isTouching(Rgroup)){
  rScore = rScore + 20;
  Rgroup.destroyEach()
  gemS.play();
  }  
  

  if(frameCount % 400 === 0 ){
    dragon()}
    player.collide(ground);

   if(player.isTouching(Dgroup)){
      gamestate = lost
      loseS.play();
      gameOver();
      themeS.stop();
    }

    if(scoreForArrow === true){
    if(frameCount % 100 === 0 ){
      arwowS.play();
    arrows()}}

    if(scoreForSpike === true){
      if(frameCount % 80 === 0 ){
        arwowS.play();
      spikeSpawn()}}

    if(scoreForStone === true){
      if(frameCount % 70 === 0 ){
        arwowS.play();
      stoneSpawn()}
    }  


    if(score >= 0){
      bg.changeImage("1",bgImg1);
      scoreForArrow = true;
      scoreForSpike = false;
      scoreForStone = false;
    }

  if(score >= 250){
    bg.changeImage("2",bgImg2);
    scoreForArrow = false;
    scoreForSpike = true; 
    scoreForStone = false; 
  }

  if(frameCount% 100 === 0){
    spawnReward();
  }

  if(score >= 500){
    bg.changeImage("3",bgImg3);
    scoreForArrow = false;
    scoreForSpike = false;
    scoreForStone = true; 
   
  }

  if(score >= 750){
    scoreForArrow = false;
    scoreForSpike = false;
    bg.changeImage("4",bgImg4);
  }

  if(score >= 1000 ){
  gamestate = won;
   
}

  if(player.isTouching(Agroup)){
    hearts -= 1;
    lifeLost();
    Agroup.destroyEach()
    ouch.play();
   
    }
  if(player.isTouching(Sgroup)){
    hearts -= 1;
    lifeLost();
    Sgroup.destroyEach();
    ouch.play();
      }
  if(player.isTouching(StGroup)){
    hearts -= 1;
    lifeLost();
    StGroup.destroyEach();
    ouch.play();
    
  }

  drawSprites();
  }

if(gamestate === lost){
  
 // gameOver()


  scoreForStone = false;
  bg.velocityX = 0;
  Dgroup.setLifetimeEach(-1);
  Dgroup.setVelocityXEach(0)
  Rgroup.setLifetimeEach(-1);
  Rgroup.setVelocityXEach(0)
  Sgroup.setLifetimeEach(-1);
  Sgroup.setVelocityXEach(0)
  StGroup.setLifetimeEach(-1);
  StGroup.setVelocityXEach(0)
  Agroup.setLifetimeEach(-1);
  Agroup.setVelocityXEach(0)

  player.velocityY =0
player.changeAnimation("player2", player2)
  
  player.overlap(Dgroup,function(collector,collected){
    collected.changeAnimation("lose",dargonLost);
 })
 


  drawSprites();
  textSize(30)
  fill(265)
  text("Sorry! You Lost",400,300)

}


if(gamestate === won){
  imageMode(CENTER)
  image(bgImg4,width/2,height/2,800,500)
  image(winImg,width/2,height/2,500,400)
  image(fireImg,width/2 -10,height/2,1500,700)
  textSize(25)
  fill(0)
  text("Press R to play again",200,300)  
  if(keyDown("r")){
    reset()

   
  }
}

textSize(25)
fill(265)
text("Distance: "+ score + " Km",500,50)
text("Score : "+ rScore,520,100)

}



function spikeSpawn(){
  spike  = createSprite(width+10,350,20,10);
  spike.velocityX = -5 ;
  spike.addImage("spikes",spikes);
  spike.scale =0.3
  Sgroup.add(spike)
  Sgroup.setLifetimeEach(200)
}

function stoneSpawn(){
  stones = createSprite(width+10,370,20,10);
  stones.addImage("stone",stone)
  stones.velocityX = -6;
  StGroup.add(stones); 
  StGroup.setLifetimeEach(200)
}

function arrows(){
  arrow = createSprite(width+10,random(290,350) ,20,10);
  arrow.velocityX = -4 
  arrow.addImage("fire",arrowImg)
  arrow.scale =0.08;
  arrow.setCollider("rectangle",0,0,arrow.width-300,arrow.height-200)
  Agroup.add(arrow)
  Agroup.setLifetimeEach(200)}

  function dragon(){
    fireDragon = createSprite(width+10,random(70,120),30,70);
    fireDragon.velocityX = -9
    fireDragon.addAnimation("fly",dragonImg)
    fireDragon.scale = 1.3
    fireDragon.setCollider("rectangle",0,0,fireDragon.width ,fireDragon.height- 100)
    fireDragon.addImage("lose",dargonLost)
    Dgroup.add(fireDragon);
    Dgroup.setLifetimeEach(200)
  }

  //restart
  function reset (){
  
    gamestate = play;
    bg.velocityX=-2
    hearts =3;
    themeS.play()
    themeS.loop = true;
    rScore = 0;

    live1.visible = true;
    live2.visible = true;
    live3.visible = true;
  
    score = 0;
    player.changeAnimation("run",playerImg);
    
    Dgroup.destroyEach()
    Rgroup.destroyEach()
    Rgroup.destroyEach()
    Sgroup.destroyEach()
    Agroup.destroyEach()
    StGroup.destroyEach()
  }

  function spawnReward(){
    gem = createSprite(width+10,random(290,350) ,20,10);
    gem.velocityX = -6 
    gem.addImage("gen",gemImg)
    gem.setCollider("rectangle",0,0,gem.width - 200,  gem.height )
    Rgroup.add(gem)
    Rgroup.setLifetimeEach(200)
  }

  function gameOver() {
    swal({
      title: `Game Over`,
      text: "Oh no! You collided with dragon...",
      
    imageUrl:"assets/snake.jpg" ,
      height : 10,
      imageSize: "100x100",
      confirmButtonText: "Wanna Try Again?",

    },
    function(isConfirm){
      if(isConfirm){
      reset();
      }
    }
    );
  }

  function lifeLost() {
    swal({
      title: `Ouch!`,
      text: "You lost a life",
      
    imageUrl:"assets/lostHeart.png" ,
      height : 10,
      imageSize: "100x100",
      confirmButtonText: "continue",

    },
    
    );
  }

  function allLivesGone(){
    swal({
      title: `Oh no!`,
      text: "You lost all lives, but Quentil didn't reach his home",
      
    imageUrl:"assets/lostHeart.png" ,
      height : 10,
      imageSize: "100x100",
      confirmButtonText: "Wanna try again?",

    },function(isConfirm){
      if(isConfirm){
      reset();
      }
    }
    
    );
  }