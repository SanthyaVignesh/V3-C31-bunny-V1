const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let ground,bunny;
var rope,fruit,fruit_con;
var button;
var blink,eat;
var sad;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny_img = loadImage('Rabbit-01.png');
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;

}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,690,600,20);

  rope = new Rope(6, {x:245 , y:30});

  var fruitOption = {
    density : 0.001
  }

  fruit = Bodies.circle(300,300,20,fruitOption);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  
  frameRate(80);
 
  rectMode(CENTER);
  ellipseMode(RADIUS);

  blink.frameDelay =20;
  sad.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(250,620,100,100);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);
  Engine.update(engine);

  ground.show();
  rope.show();
  
  if(fruit!==null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
 
  if(collide(fruit,bunny)){
    bunny.changeAnimation("eating");
  }

  if(collide(fruit,ground)){
    bunny.changeAnimation("crying");
  }

  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(body,sprite){
  if(body!== null){
    var d  = dist(body.position.x, body.position.y,sprite.x, sprite.y);
    if(d <= 80){
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}
