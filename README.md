# Yifei Fan's Homework of Coding One.
Hello! Welcome to my final project of coding one. My project is a simple anti-Utopia game called "Control".  
## Table of Contents

- [Introduce](#introduce)
- [How to run the project](#how-to-run-the-project)
- [Highlights in the code](#highlights-in-the-code)

## Introduce

You work for a powerful government. They ask you to do a job that looks simple but has hidden secrets. A big eye is watching your every move at the place you work.  

By chance, you discovered the secret and the truth. What choice would you make? What is your ending under the rule of a powerful government?  

Play it now and find all the 3 endings!

## How to run the project

If you haven't download Node.js before, All you need to do is 5 simple things:  
1.Download and install the Node.Js at https://nodejs.org/en/download/  
  
2.Download my project folder and open the "coding1-fan-homework" by Visual Code.  
  
3.Enter this code in terminal and press the enter key several times.
```sh
npm init
```
4.Enter this code in terminal and wait for install.
```sh
npm install
```
5.Enter this code in terminal and click the link with control key.
```sh
npm run dev
```
It's time! It's time to try this game! (A boring meme from my game)  
  
By the way, I found this game requires high computer configuration to achieve a smooth gaming experience. However, if your computer cannot run it smoothly or you are a victim of mac, don't worry. I have record the whole content of the game (all the 3 endings!). Check it in video folder.  
  
If you can run it smoothly, I highly recommend you to play it and find all the endings! I promise you will have a good time exploring :)

## Highlights in the code

### How do I control the animation speed so that it corresponds to the movement speed?  
After importing the FBX file, I creat animate control mixer[] and random speed[] for every object. Then I use ".timeScale" function, make it corresponds to the speed.
```sh
for(i= 0 ; i<num ; i++){
    mixer[i].timeScale = 1*Math.sqrt((Math.abs(speed[i])-0.8));
    if ( mixer[i] ) mixer[i].update( delta );
    }    
```
  
### How do I make this eye cast the light on walking object?  
This effect is achieved with two elements: A plane with canvas texture and a point light.  
A texture was draw by a function, it will return to a texture like this:
```sh
function getTextCanvas1(){ 
  var canvas = document.createElement('canvas');
  ...
          
  let texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	return texture;
  }
```
After that, creat a plane and state a material map to this:
```sh
let BackMaterial = new THREE.MeshBasicMaterial( { map: getTextCanvas1() } ) ;
BackMaterial.needsUpdate = true;
```
And remember to update it in function draw()! (really important and I have spent a lot of time to check why it not work!!!)
```sh
BackMaterial.map = getTextCanvas1();
```
A point light will change its position with mouse move so it looks like the eye in canvas is casting the light.
```sh
pointLight1.position.set( -1000, 400+ydistance*200/innerHeight, xdistance*2000/innerWidth );
```

### How do I read the player's choice and leading to the ending?  
I used countless flag and function. As long as you are patient enough to adjust, no problem will stump you!
