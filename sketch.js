var trex, imgTrex, imgTrexFracassado;
var ground, ground2, imgGround;
var nuven,imgNuven;
var cacto,imgC1,imgC2,imgC3,imgC4,imgC5,imgC6;
var gCactos; 
var gNuvens; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var gameOver,imgGameOver;
var reiniciar,imgReiniciar;

function preload() {
  imgTrex = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imgTrexFracassado = loadImage("trex_collided.png");

  imgGround = loadImage("ground2.png");

  imgNuven = loadImage("cloud.png");

  imgC1 = loadImage("obstacle1.png");
  imgC2 = loadImage("obstacle2.png");
  imgC3 = loadImage("obstacle3.png");
  imgC4 = loadImage("obstacle4.png");
  imgC5 = loadImage("obstacle5.png");
  imgC6 = loadImage("obstacle6.png");

  imgGameOver = loadImage("gameOver.png");
  imgReiniciar = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
 
  //criar um sprite trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", imgTrex);
  trex.addImage("collided",imgTrexFracassado);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  trex.debug = false; 
  
  //criar um sprite ground (chão)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",imgGround);
  ground.x = ground.width /2;
  ground.velocityX = -5;

  ground2 = createSprite(200,190,400,10);
  ground2.visible = false ;

  gCactos = new Group();
  gNuvens = new Group();

  gameOver = createSprite(300,100);
  gameOver.addImage(imgGameOver);
  gameOver.scale = 0.5;

  reiniciar = createSprite(300,140);
  reiniciar.addImage(imgReiniciar);
  reiniciar.scale = 0.5;


  score = 0;
}

function draw() {
  background(170);

  text("pontuação;-;"+ score,450,20);
  score = score + Math.round(frameCount/50);

  if (gameState === PLAY){

    gameOver.visible = false;
    reiniciar.visible = false;

    if (keyDown("space") && trex.y >= 155 ) {
      trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    criarNuvens();
    criarCacto();

    if (gCactos.isTouching(trex)) {
      gameState = END;
    }

  }
  else if (gameState === END){

    gameOver.visible = true;
    reiniciar.visible = true;

    ground.velocityX = 0;
    
    trex.changeImage("collided",imgTrexFracassado);

    gCactos.setVelocityXEach(0);
    gNuvens.setVelocityXEach(0);
    
    gCactos.setLifetimeEach(-1);
    gNuvens.setLifetimeEach(-1);
  }
  
  trex.collide(ground2);

  drawSprites();
}

function criarNuvens() {

  if(frameCount % 60 === 0){
    nuven = createSprite(610,random(20,100),10,10);
    nuven.addImage(imgNuven);
    nuven.velocityX = -3;
    nuven.scale = 0.1;
    nuven.lifetime = 220;

    trex.depth = nuven.depth;
    trex.depth = trex.depth + 1;
    gNuvens.add(nuven);
  }
}

function criarCacto() {

  if(frameCount % 60 === 0){
    cacto = createSprite(610,170,10,10);
    //
    cacto.velocityX = -5;
    

    var alt = Math.round(random(1,6));
    switch(alt){
      case 1:
        cacto.addImage(imgC1);
        break;

      case 2:
        cacto.addImage(imgC2);
        break;  

      case 3:
        cacto.addImage(imgC3);
        break; 
        
      case 4:
        cacto.addImage(imgC4);
        break;
        
      case 5:
        cacto.addImage(imgC5);
        break;
        
      case 6:
        cacto.addImage(imgC6);
        break;
        
      default:break;
        
    }
      cacto.scale = 0.5  ;
      cacto.lifetime = 167
      gCactos.add(cacto);
  }
}






