var trex,trex_runs,ground,g_img,ig,cimg,rap,o1,o2,o3,o4,o5,o6,
cgrp,rgrp,ogrpp,gameState,td,go,rg,go1,rg1,sc,hsc,sp,
x1,x2

function preload(){console.log("preload")
trex_runs=loadAnimation("BWT/trex1.png","BWT/trex2.png","BWT/trex3.png")
g_img=loadImage("BWT/ground.png")
cimg=loadImage("BWT/cloud.png")
rimg=loadAnimation("BWT/Aviraptor_1.png","BWT/Aviraptor_2.png")
o1img=loadImage("BWT/obstacle1.png")
o2img=loadImage("BWT/obstacle2.png")
o3img=loadImage("BWT/obstacle3.png")
o4img=loadImage("BWT/obstacle4.png")
o5img=loadImage("BWT/obstacle5.png")
o6img=loadImage("BWT/obstacle6.png")
td=loadAnimation("BWT/trex_collided.png")
go1=loadImage("BWT/gameOver.png")
rg1=loadImage("BWT/restart.png")
}
function setup() {console.log("setup")
  createCanvas(windowWidth,windowHeight);
  sp=4
  trex=createSprite(60,height-60,50,50)
  trex.addAnimation("runs",trex_runs)
  trex.addAnimation("dies",td)
  trex.scale=0.5
  // ground=createSprite(width/2,height-15,width,10)
  // ground.velocityX=-sp
  // ground.addImage(g_img )
  ig=createSprite(width/2,height-5,width ,5)
  ig.visible=false
  // trex.debug=true
  trex.setCollider("circle",0,0,37)
  sc=0
  hsc=0
  x1=0
  x2=width

  cgrp=new Group ()
  ogrp=new Group ()
  rgrp=new Group ()
  console.log(Math.round(random(1,10)))
  gameState=0
  go=createSprite(width/2,height/2)
  go.addImage(go1)
  rg=createSprite(width/2,height/2+50)
  rg.addImage(rg1)
  rg.scale=0.5
  go.visible=false
  rg.visible=false
}

function draw() 
{
  // console.log(frameCount)
  background(255 );
  image(g_img,x1,height-30,width,20)
  image(g_img,x2,height-30,width,20)
  
  if(x1<-width){
  x1=width+x2  
  }
  if(x2<-width){
    x2=width+x1 
    }
  go.depth=trex.depth+1
  rg.depth=trex.depth+1
  if(gameState==0){
  if ((keyDown("space")||touches.length>0)&&trex.y>=height-44)
  {
    trex.velocityY=-10.5
   touches=[]
  } 
  x1-=sp
  x2-=sp
  spawnraps()
  spawnclouds()
  spawncacti()
  if(trex.isTouching(ogrp)||trex.isTouching (rgrp)){
  gameState=2  
  }
  if(frameCount % 7==0){
    sc+=1
  }
  // text(frameCount+" "+sp,width/2,height/2)
  if(frameCount % 250==0){sp+=0.3}
  }
  else{//ground.velocityX=0
  cgrp.setVelocityXEach(0)
  ogrp.setVelocityXEach(0)
  rgrp.setVelocityXEach(0)  
  trex.changeAnimation("dies") 
  cgrp.setLifetimeEach(-1)
  ogrp.setLifetimeEach(-1)
  rgrp.setLifetimeEach(-1)
  go.visible=true
  rg.visible=true
  if(mousePressedOver(rg)||touches.length>0){
    touches=[]
    go.visible=false
    rg.visible=false
    cgrp.destroyEach()
    ogrp.destroyEach()
    rgrp.destroyEach()
    trex.changeAnimation("runs")
    if (sc>hsc){hsc=sc}
    sc=0
    sp=4
    gameState=0
  }
  }
  trex.velocityY+=0.5
  
  trex.collide(ig,)
 

//  if(ground.x<0){
// ground.x=ground.width/2  
//   }
  text(hsc,width-50,30) 
  text(sc,width-100,30)
  drawSprites()



}
function spawnclouds(){
  if(frameCount %60==0){

  
var cloud=createSprite(width,random(50,height-100),50,50)
cloud.velocityX=-sp
cloud.depth=trex.depth
cloud.addImage(cimg)
cloud.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
trex.depth+=  1
cloud.lifetime=width/3+100 
 cgrp.add(cloud)      
}

}

function spawnraps(){
  if(frameCount %1000==0&&frameCount%100!=0){  
  var rap=createSprite(width,random(50,height-50),10,10)
  rap.velocityX=-sp
  rap.addAnimation("fly",rimg)
  rap.scale=0.3 
  rap.lifetime=width/3+100
  rgrp.add(rap)
  }}
  
function spawncacti(){
  if(frameCount %100==0){
  var cactus=createSprite(width,height-20,50,150)
  cactus.velocityX=-sp
  cactus.scale=0.5
  cactus.lifetime=width/3+100
  // cactus.debug=true
  var r=Math.round(random(1,6))
  switch(r){
  case 1:cactus.addImage(o1img)
  cactus.scale=0.6 
  break  
  case 2:cactus.addImage(o2img)
  break  
  case 3:cactus.addImage(o3img)
  cactus.scale=0.7
  break  
  case 4:cactus.addImage(o4img)
  break  
  case 5:cactus.addImage(o5img)
  break  
  case 6:cactus.addImage(o6img)
  cactus.scale=0.4
  break 
 
  }
ogrp.add(cactus)
  }
}
 