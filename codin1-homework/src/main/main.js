import * as THREE from 'three';

			// import Stats from 'three/examples/jsm/libs/stats.module.js';


			import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
			
			
			let playendflag =0;
			
			let endframe = 0;

			const num = 11;

			let camera, scene, renderer, stats;

			const clock = new THREE.Clock();

			let mixer = [];
			
			let human = [];

			let flag = []; //flag is used to turn the direction of human!
			
			let positionX = [];

			let positionZ = [];

			let speed = [];

			let speedFlag = [];

			let controlFlag = [];

			let monitorcamera = [];

			let antiBugFlag = [];

			let angle = 0;

			let playFrame = 0;

			let monitorRotateFlag = 1;

			let lightZ = 0;

			let pointLight1;
			
			

			let mouseX = window.innerWidth/2;
        	let mouseY = window.innerHeight/2;
			
			let meshBack ;
			
			let enterFlag = 0;
			let kFlag = 0;
			let saveFlag = 0;


			let step=20;
			let PI = Math.PI;

			let lockK = 1;
			let lockEnter = 0;
			let lockSave = 1;
			let disableSave = 0;
			let endFlag = 0;
			let restartFlag = 0;
			


			// let guideText =[];{
			// 	guideText =[
			// 		"press ENTER to continue",
			// 		"press K to dispose",
			// 		"忠诚就是一切",
			// 		"去死",
			// 		"HOW DARE YOU!!!!",
					
					
					
			// 		]
			   

			// let alertText = [];
			// 	alertText =[
			// 	"救命！不要继续这样做了，一切都是谎言",
			// 	"我们是有生命的底层人，所谓的暂停实际上是对我们进行杀害！",
			// 	"如果你愿意帮助我们，请用鼠标点击正中间，那里有我们的一条密道",
			// 	"在他下一次显示处置人数的时候，找一下试试吧",
			// 	"无论如何，感谢你"
				
			// 	]

			

			// let screenText = [];
			// 	screenText= [
					
			// 		"是时候了！是时候为伟大祖国做光荣事业了",
			// 		"同志，政府将这项光荣的任务交给了你！",
			// 		"听着，你的职责十分简单：处置这些无能人",
			// 		"你只需要按下K键就处置一个无能人",
			// 		"不必担心，无能人是没有生命的物品",
			// 		"你的处置也仅是让他们暂停而不会对他们造成伤害",
			// 		"现在按K键试试吧",
			// 		"干得漂亮！你成功处置了一个无能人",
			// 		"继续工作吧，另外记住：不要乱按其他地方",
			// 		"按K键处置，已处置人数： ",//[9]
			// 		//kill 3 time
			// 		"同志，刚才似乎有一些噪音，请不要放在心上",
			// 		"继续你的工作吧，记住：不要乱按其他地方",//[11]
			// 		//press 1 time
			// 		"同志，刚才发生了什么事情？",
			// 		"你犯了一个错误，你错误点击了别的地方，因此有的无能人消失了",
			// 		"这种行为让伟大的祖国蒙受了损失，为你感到羞耻",
			// 		"但祖国是宽容的，我们原谅你，并希望这样的事情不会再发生",
			// 		"继续你的工作吧，从现在起不要乱按其他地方了",//[16]
			// 		//press 2 time
			// 		"同志，我真的希望这也是一个失误",
			// 		"不然你简直是我们伟大国家的耻辱",
			// 		"组织给你最后一次机会，做你应该做的事情",
			// 		"从现在起，按K键处置并且不要做任何其他事情",//[20]
			// 		//press 3 time	
			// 		"我想我们已经谈过好几遍这个问题了",
			// 		"政府给了你足够的信任，但你却辜负了它",
			// 		"另外告诉你一个消息：无能人的密道已经被发现并禁用",
			// 		"从现在起只有K键能被使用",
			// 		"如果你从现在起悔改并继续完成任务，政府会原谅你的失误",
			// 		"并减轻对你的处罚",
			// 		"当然你也可以继续抵抗并尝试解救他们，但这不会有任何效果",
			// 		"并且你将会收到最严厉的处罚",//[28]
			// 		//kill all and no save
			// 		"好样的，同志！你完美的完成了政府给你的任务",
			// 		"政府以你为骄傲，你的出色功绩会被人记住",
			// 		"现在是时候了！是时候为伟大祖国做下一项光荣事业了",
			// 		"这项任务有些复杂，我没法跟你讲诉明白，跟我来",//[32]
			// 		//kill all and save
			// 		"你最终还是做了理智的选择并回到了正道",
			// 		"虽然你放走了几个人，但也算是完成了任务",
			// 		"但同时因为你犯了叛国罪，我们决定将你逮捕",
			// 		"原谅？我好像是有过这个承诺",
			// 		"好的，那政府原谅你的失误",
			// 		"但同时政府不会原谅你的背叛",
			// 		"HOW DARE YOU!!!!"
			// 		]
			let guideText =[];{
				guideText =[
					"press ENTER to continue",
					"press K to dispose",
					"press K to to continue",
					"HOW DARE YOU!!!!",
					"HOW DARE YOU!!!!",
					
					
					
					]
			   

			let alertText = [];
				alertText =[
				"Help! Stop doing this, it's all a lie",
				"We are living people at the bottom of society, and the so-called 'dispose' is actually killing us!",
				"If you are willing to help us, please use the mouse to find the secret button to save us",
				"The button is hidden where the eyes are most afraid",
				"Try to find it the next time he asks you to press K(When the upper subtitles shows 'press K to dispose')"
				]

			

			let screenText = [];
				screenText= [
					
					"it's time! It's time to do a glorious task for our great motherland!",
					"Comrade, the government has entrusted you with this glorious task!",
					"Listen, your duty is simple: dispose of these incompetents",
					"All you have to do is press K to dispose them",
					"Don't worry, incompetents are inanimate",
					"Your disposition is only to pause them without doing them any harm",
					"Try it now by pressing K",
					"Well done! You perfectly dispose of an incompetent",
					"Keep working, and remember: don't click on other places",
					"Press K to dispose, you have disposed: ",//[9]
					//kill 3 time
					"Comrade, there seemed to be some noise just now, please don't care",
					"Keep working, and remember: don't click on other places",//[11]
					//press 1 time
					"Comrade, what just happened?",
					"You made a mistake, and an incompetent escaped",
					"This behavior has caused losses to our government, shame on you",
					"We forgive you and hope that such a thing will not happen again",
					"Keep working and DON'T CLICK ANYTHING else from now on",//[16]
					//press 2 time
					"Comrade, I really hope this is a mistake too",
					"otherwise you are a shame to our great country",
					"The government is giving you one last chance to do what you should do",
					"From now on, press K and DON'T DO ANYTHING ELSE",//[20]
					//press 3 time	
					"We think we've talked about this a few times",
					"The government gave you enough trust, but you failed it",
					"By the way: The secret button has been discovered and banned",
					"From now on only the K key can be used",
					"If you repent from now on and continue to complete your work",
					"The government may forgive you for your mistake",
					"Of course you can continue to resist and try to save them",
					//kill all and no save
					"Well done, comrade! You have perfectly fulfilled the task",
					"The motherland is proud of you, and you will be remembered",
					"Now it's time! It's time to do the next glorious task for motherland!",
					"This task is a bit complicated, I can't explain it to you, come with me",//[32]
					//kill all and save
					"You finally made the wise choice and got back on track",
					"Although you let go of a few people, you still have completed the task",
					"But at the same time we decided to arrest you for treason, you will die",
					"Forgive? We seem to have this promise",
					"Well, then the government forgives your mistake",
					"But the government won't forgive your betrayal, you're a traitor",
					"HOW DARE YOU!!!!",
					"HOW DARE YOU!!!!",
					"HOW DARE YOU!!!!",
					"HOW DARE YOU!!!!",
					"HOW DARE YOU!!!!",
					]



		
			function getTextCanvas1(){ 
				
				//var width=1920, height=1080; 
					var canvas = document.createElement('canvas');
					canvas.width = 1920;
					canvas.height = 1080;
        		var context = canvas.getContext("2d");
				var xdistance= (mouseX-window.innerWidth/2)*1920/window.innerWidth;
				var ydistance= (mouseY-window.innerHeight/2)*1080/window.innerHeight;
				var xydistance= Math.sqrt(xdistance*xdistance+ydistance*ydistance);
				var eyecolor;
				var freecolor=0;
				var xx = mouseX/innerWidth;
				var yy = mouseY/innerHeight;
				if(xydistance<canvas.width/2){
						eyecolor=parseInt(2*xydistance/canvas.width*255);
				}
				else
					eyecolor=255;
				context.clearRect(0,0, canvas.width, canvas.height);
					context.beginPath();
				context.strokeStyle = "#FFFFFF";
				context.lineWidth=0.5;
				// context.fillStyle = "#"+"FF"+Math.floor(eyecolor).toString(16)+Math.floor(eyecolor).toString(16);
				this.color1 = `rgb(${255},${eyecolor},${eyecolor})`
					context.fillStyle = this.color1;
					context.beginPath();
				
					context.ellipse(canvas.width/2+xdistance*0.2, canvas.height/2+ydistance*0.2-70, 110, 110, 0, 0, 2 * Math.PI,true);
				// context.stroke();
					context.fill();
						context.beginPath();
					context.fillStyle = 'black';
					context.ellipse(canvas.width/2+xdistance*0.22, canvas.height/2+ydistance*0.22-70, 70-xydistance*0.015, 70-xydistance*0.015, 0, 0, 2 * Math.PI,true);
				context.fill();
				//  context.stroke();			
				this.color2 = `rgb(${255-eyecolor},${255-eyecolor},${255-eyecolor})`
				
				if(saveFlag>20)
				freecolor = (saveFlag-20)*0.1;

				this.color3 = `rgba(${0},${255},${0},${freecolor})`
				
				
				
				
				context.beginPath();
				context.fillStyle = 'white';
				context.strokeStyle = "#FFFFFF";
				context.lineWidth=3;
				for(i=0;i<step+1;i++){
					
					var t1=(step-i)/step;
					var x1= canvas.width/4+ canvas.width*0.5*t1+xdistance*0.1;
					var y1= canvas.height/2+canvas.height*0.09*Math.sin(PI*t1)*(1.5+2.1*ydistance/canvas.height)-70;
					context.lineTo(x1,y1); 
					context.stroke();
				}
				
					context.beginPath();
				context.fillStyle = 'white';
				context.strokeStyle = "#FFFFFF";
				context.lineWidth=3;
				for(i=0;i<step+1;i++){
					
					var t=(step-i)/step;
					var x= canvas.width/4+ canvas.width*0.5*t+xdistance*0.1 ;
					var y= canvas.height/2-canvas.height*0.09*Math.sin(PI*t)*(1.5-2.1*ydistance/canvas.height)-70;
					context.lineTo(x,y); 
					context.stroke();
				}

				context.font="60px Georgia"

      
      			context.textAlign = 'center';
			
				if(saveFlag>=20) fillguide(3);
				
				else{
					
					if(getKill()+getSave()==num && lockK==0) fillguide(2);
				else{
					if(lockEnter==0) fillguide(0);
					if(lockK==0) fillguide(1);
				}
			}
		
				
				fillscreen(getScreenNum());
				
				

				function fillguide(i){

					context.font="40px Georgia"

    				context.textAlign = 'center';

					context.fillText(guideText[i],canvas.width*0.5,canvas.height*0.05);
					
				}

				function fillscreen(i){

					context.font="60px Georgia"

    				context.textAlign = 'center';
					if(i==9){  
						context.fillText(screenText[i]+(getKill()),canvas.width*0.5,canvas.height*0.8);
					}

					else context.fillText(screenText[i],canvas.width*0.5,canvas.height*0.8);

					
					
				}
				
				//huageyuan
				if(lockSave==0){
					if(xx>0.46&&xx<0.52&&yy>0.52&&yy<0.58){
						context.beginPath();
						context.fillStyle = '#2a2a2a';
						context.lineWidth=10;
						context.strokeStyle = "#001701";
						context.ellipse(canvas.width*0.5, canvas.height*0.9, 60, 60, 0, 0, 2 * Math.PI,true);
						//context.fill();
						context.stroke();
						if(disableSave==1){
							context.beginPath();
						context.fillStyle = 'red';
						context.moveTo(canvas.width*0.5-70-15,canvas.height*0.9-70+15);
						context.lineTo(canvas.width*0.5-70+15,canvas.height*0.9-70-15);
						context.lineTo(canvas.width*0.5+70+15,canvas.height*0.9+70-15);
						context.lineTo(canvas.width*0.5+70-15,canvas.height*0.9+70+15);
						context.fill();
						context.beginPath();
						context.moveTo(canvas.width*0.5-70-15,canvas.height*0.9+70-15);
						context.lineTo(canvas.width*0.5-70+15,canvas.height*0.9+70+15);
						context.lineTo(canvas.width*0.5+70+15,canvas.height*0.9-70+15);
						context.lineTo(canvas.width*0.5+70-15,canvas.height*0.9-70-15);
						
						context.fill();

						}
						
					}

				}
				if(saveFlag>20){
				context.fillStyle = this.color3;
				//context.fillStyle = 'green';
				context.beginPath();
				context.moveTo(canvas.width*0.5-200-40,canvas.height*0.5-70-200+40);
				context.lineTo(canvas.width*0.5-200+40,canvas.height*0.5-70-200-40);
				context.lineTo(canvas.width*0.5+200+40,canvas.height*0.5-70+200-40);
				context.lineTo(canvas.width*0.5+200-40,canvas.height*0.5-70+200+40);
				context.fill();
				context.beginPath();
				context.moveTo(canvas.width*0.5-200-40,canvas.height*0.5-70+200-40);
				context.lineTo(canvas.width*0.5-200+40,canvas.height*0.5-70+200+40);
				context.lineTo(canvas.width*0.5+200+40,canvas.height*0.5-70-200+40);
				context.lineTo(canvas.width*0.5+200-40,canvas.height*0.5-70-200-40);
						
						context.fill();

				}
				
				
					
				

				
				

				let texture = new THREE.Texture(canvas);
				texture.needsUpdate = true;
				return texture;
			}


			let BackMaterial = new THREE.MeshBasicMaterial( { map: getTextCanvas1() } ) ;
			
		
			
			
		
			BackMaterial.needsUpdate = true;
			



			
			


			init();
			animate();

			function init() {



				for(i=0;i<num ;i++){    

					flag[i] = Math.random() < 0.5 ? -1 : 1; 
					//positionX[i] = (1-2*Math.random())*300;
					positionX[i] = -300 + 30*i;
					positionZ[i] = (1-2*Math.random())*1000;
					speedFlag[i] = flag[i] == -1 ? -1 : 1;
					speed[i] = speedFlag[i]*((Math.random() *( 2 - 1 + 1) ) + 1);
					flag[i] = 1;
					controlFlag[i] = 1;
					antiBugFlag[i] = 0;
					

				}

				
				const container = document.createElement( 'div' );
				document.body.appendChild( container );
				
				//xj
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 900, 800, 0 );
				camera.rotation.set(  -1.5217062778268127, 1.181685158773679,  1.5177473087182);

				// camera.position.set( -129.8150967679995,  185.41873319669276,  -827.1704605461114);
				// camera.rotation.set(   -3.135156334441105, -0.11231717425153157,  -3.140871253549839,);
				
				

				
				

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 'rgb(0,0,0)' );
				//scene.fog = new THREE.Fog( 'colorSet', 200, 3000 );

				
				pointLight1 = new THREE.PointLight( "rgb(255,0,0)", 1.2, 0 );
				//pointLight1.position.set( -800, 532, 576 );//monitor pos
				//pointLight1.position.set( -600, 200, 500 );//shadow pos
				//pointLight1.position.set( -1000, 0, 600 );//shadow on wall pos
				pointLight1.castShadow = true;
				pointLight1.shadow.mapSize.width = 3000; // default
				pointLight1.shadow.mapSize.height = 3000; // default
				pointLight1.shadow.camera.near = 0.5; // default
				pointLight1.shadow.camera.far = 3000 // default
				scene.add( pointLight1 );


				let monitorLight = [];
				monitorLight[0] = new THREE.PointLight( "rgb(255,0,0)", 2, 1 );
				monitorLight[0].castShadow = false;
				monitorLight[0].distance = 650;
				monitorLight[0].position.set( -1000, 700, -600 );
				scene.add( monitorLight[0] );
				
				monitorLight[1] = new THREE.PointLight( "rgb(255,0,0)", 2, 1 );
				monitorLight[1].distance = 650;
				monitorLight[1].castShadow = false;
				monitorLight[1].position.set( -1000, 700, 600 );
				scene.add( monitorLight[1] );


				const pointLight = new THREE.PointLight( "rgb(255,255,255)", 0, 0 );
				pointLight.position.set( -2000, 2000, 0 );
				scene.add( pointLight );
				pointLight.castShadow = true;
				pointLight.shadow.mapSize.width = 3000; // default
				pointLight.shadow.mapSize.height = 3000; // default
				pointLight.shadow.camera.near = 0.5; // default
				pointLight.shadow.camera.far = 3000 // default


				const groundMatrial = new THREE.MeshStandardMaterial( {  color: "rgb(50,50,50)" } );
				groundMatrial.roughness = 1;
				const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 2000 ), groundMatrial );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

				//back
				meshBack = new THREE.Mesh( new THREE.PlaneGeometry( 1980, 1080 ), BackMaterial );
				meshBack.position.set(-1100,300,0);
				meshBack.rotation.y =  Math.PI / 2;
				scene.add( meshBack );

				//cover
				const meshLeft = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshBasicMaterial( { color: "rgb(0,0,0)" } ) );
				meshLeft.receiveShadow = true;
				meshLeft.position.set(0,700,-1000);
				scene.add( meshLeft );

				const planeRevers = new THREE.PlaneGeometry( 2000, 2000 );
				planeRevers.scale(-1,1,1);
				const meshRight = new THREE.Mesh( planeRevers , new THREE.MeshBasicMaterial( { color: "rgb(0,0,0)" } ) );
				meshRight.receiveShadow = true;
				meshRight.position.set(0,700,1000);
				scene.add( meshRight );

				
				

				// model
				
				const loader = new FBXLoader();
				loader.load( './model/Walking.fbx', function ( object ) {
					mixer[0] = new THREE.AnimationMixer( object );                    
					const action = mixer[0].clipAction( object.animations[ 0 ] );
					action.play();
					object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}                     
					} );
					human[0] = object;
					scene.add( human[0] );
					
				});
				// the loads of codes below are all used to creat new human
				// I tried to use for(), but it not work :(
				loader.load( './model/Walking.fbx', function ( object ) {mixer[1] = new THREE.AnimationMixer( object );const action = mixer[1].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[1] = object;scene.add(human[1]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[2] = new THREE.AnimationMixer( object );const action = mixer[2].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[2] = object;scene.add(human[2]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[3] = new THREE.AnimationMixer( object );const action = mixer[3].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[3] = object;scene.add(human[3]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[4] = new THREE.AnimationMixer( object );const action = mixer[4].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[4] = object;scene.add(human[4]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[5] = new THREE.AnimationMixer( object );const action = mixer[5].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[5] = object;scene.add(human[5]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[6] = new THREE.AnimationMixer( object );const action = mixer[6].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[6] = object;scene.add(human[6]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[7] = new THREE.AnimationMixer( object );const action = mixer[7].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[7] = object;scene.add(human[7]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[8] = new THREE.AnimationMixer( object );const action = mixer[8].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[8] = object;scene.add(human[8]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[9] = new THREE.AnimationMixer( object );const action = mixer[9].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[9] = object;scene.add(human[9]);});
				loader.load( './model/Walking.fbx', function ( object ) {mixer[10] = new THREE.AnimationMixer( object );const action = mixer[10].clipAction( object.animations[ 0 ] );action.play();object.traverse( function ( child ) {if ( child.isMesh ) {child.castShadow = true;child.receiveShadow = true;}});human[10] = object;scene.add(human[10]);});
	
				loader.load( './model/Monitor new.fbx', function ( object ) {
					console.log(object);
					object.scale.multiplyScalar( 80 );
					object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}                     
					} );
					monitorcamera[0] = object;
					monitorcamera[0].position.set(-1000, 600, 600);

					scene.add( monitorcamera[0]);

					monitorcamera[0].rotateY(Math.PI*0.95);
					monitorcamera[0].rotateX(Math.PI*-0.5);
				});

				loader.load( './model/Monitor new.fbx', function ( object ) {
					console.log(object);
					object.scale.multiplyScalar( 80 );
					object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}                     
					} );
					monitorcamera[1] = object;
					monitorcamera[1].position.set(-1000, 600, -600);

					scene.add( monitorcamera[1]);

					monitorcamera[1].rotateY(Math.PI*0.95);
					monitorcamera[1].rotateX(Math.PI*-0.5);
				});

			


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap
				container.appendChild( renderer.domElement );

				// stats = new Stats();
				// container.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize );

				window.addEventListener('click', saveEvent) ;


				window.addEventListener('mousemove', (e) =>{


					mouseX= e.clientX;
					mouseY= e.clientY;

				});
				

				 window.addEventListener('keyup',(e)=>{
				if(e.key =='k') kEvent(); //k
				if(e.keyCode==13) enterEvent(); //enter
				if(e.key == 'i') {
					console.log(getKill());
					console.log(getSave());
					
				}
				
				})


			}
			
			
			function getKill() {
				var x=0;
				for(i=0;i<num;i++){
					if(speed[i]==0&&positionX[i]<10000) x++;
				}
				return x;

			}

			function getSave() {
				var x=0;
				for(i=0;i<num;i++){
					if(positionX[i]>10000) x++;
				}
				return x;

			}
			

			function getScreenNum(){

				if(enterFlag==12||enterFlag==17||enterFlag==22||enterFlag == 29) return 9;
				if(enterFlag>12&&enterFlag<17) return enterFlag-1;
				if(enterFlag>17&&enterFlag<22) return enterFlag-1;
				if(enterFlag>22&&enterFlag<40) return enterFlag-2;
				else return enterFlag;


			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


			function kEvent() {
				if(lockK==0){
					var i= (Math.floor(Math.random() *( num - 0 + 1) ) + 0);
					var retry = 0;
				
					while((controlFlag[i]==0 || Math.abs(positionZ[i])>990||positionX[i]>10000)&&retry<100){
					if(i<num) i+=1;
					if(i>=num) i =0;
					console.log("retry");
					retry ++;
					}
					if(retry!= 100)
					controlFlag[i] = 0;
					kFlag += 1;
					if(enterFlag==6) {
						enterFlag++;
						lockEnter =0;
						lockK =1;
					}
					if(enterFlag==9&&getKill()==2) {
						for(i=0;i<5;i++)
						window.alert(alertText[i]);
						enterFlag++;
						lockEnter =0;
						lockK =1;
					}
					if(getKill()+getSave()==num){
						if(saveFlag<3) {
							enterFlag= 30;
							lockEnter =0;
							lockK =1;
							lockSave =1;
							
						}
						else {
							enterFlag = 34;
							lockEnter =0;
							lockK =1;
							lockSave =1;
						}
					}
				}
				//if(enterFlag==6) lockK= 0;
				}

				function playend1(){
					if(restartFlag==0){
					for(i=0;i<num ;i++){    

						
						positionX[i] = -300 + 30*i;
						positionZ[i] = (1-2*Math.random())*1000;
						speedFlag[i] = 1
						speed[i] = speedFlag[i]*((Math.random() *( 2 - 1 + 1) ) + 1);
						flag[i] = 1;
						controlFlag[i] = 1;
						antiBugFlag[i] = 0;
						
					}

					restartFlag = 1;

				}
				
			if(endframe%60==0) controlFlag[Math.floor(endframe/60)-1]=0;
			camera.position.set( -129.8150967679995,  185.41873319669276,  -1000+2*endframe);
			if(endframe>500){
				camera.position.set( -129.8150967679995,  185.41873319669276,  0);}
		if(endframe==700){
			
			if(playendflag==0){
				window.alert("ENDING1:loyalty");
			window.alert("You become a loyal incompetent");
			window.alert("Refresh to try other endings! There are 3 endings");
			playendflag =1;

			}
			
			
		}
			
			camera.rotation.set(   -3.135156334441105, -0.11231717425153157,  -3.140871253549839,);
			endframe++;

				}	
				function playend2(){
					if(playendflag==0){
					
					window.alert("ENDING2: traitor");
					window.alert("You are killed by goverment");
					window.alert("Refresh to try other endings! There are 3 endings");
					playendflag=1;}
					
	
				}

				function playend3(){
					if(playendflag==0){
					window.alert("ENDING3: Freedom");
					window.alert("L'homme est né libre —————Jean-Jacques Rousseau");
					window.alert("Refresh to try other endings! There are 3 endings");
					playendflag=1;
					}
					
				}

			function enterEvent(){
				
				if(lockEnter==0)
				enterFlag +=1 ;
				if(enterFlag==6||enterFlag==9){
					lockEnter = 1;
					lockK=0;
				}
				if(enterFlag==12||enterFlag==17||enterFlag==22){
					lockEnter = 1;
					lockK=0;
					lockSave =0;
				}
				if(enterFlag==29){
					lockEnter = 1;
					lockK=0;
					lockSave =0;
					disableSave = 1;
				}
				if(enterFlag==34) {
					//playEnd(0);
					endFlag= 1;
					lockEnter= 1;}
				if(enterFlag==40) {
					
					//playEnd(1);
					endFlag= 2;
					lockEnter= 1;}
				
				console.log("enterFlag = ",enterFlag);
					
				}
			
			
			function saveEvent(){
				if(lockSave==0){
					var xx = mouseX/innerWidth;
				var yy = mouseY/innerHeight;

				if(xx>0.46&&xx<0.52&&yy>0.52&&yy<0.58){
					if(disableSave==0){
						var i= (Math.floor(Math.random() *( num - 0 + 1) ) + 0);
				var retry = 0;
				while((controlFlag[i]==0 || Math.abs(positionZ[i])>1000 || positionX[i]>10000)&&retry<100){
					if(i<num) i+=1;
					if(i>=num) i =0;
					console.log("retry");
					retry ++;
				}
				if(retry!=100) positionX[i] = 30000;
				console.log('i=',i);

					}
				
				saveFlag += 1;
				console.log('saveflag=',saveFlag);
				if(enterFlag==12||enterFlag==17||enterFlag==22){
					lockSave = 1;
					lockK = 1;
					lockEnter =0;
					enterFlag += 1; 
				}
				if(enterFlag == 29&&saveFlag>20){
				
					disableSave = 0;
					enterFlag = 40;

				}
				if(saveFlag>20)
				{
					lockK=1;
					lockEnter=0;
				}
				if(saveFlag==31){
					endFlag = 3;
					//playEnd(2);
				}
				

				}
				
				}

				
				
				
				
			}
			
			

			function animate() {

				requestAnimationFrame( animate );

				const delta = clock.getDelta();


				//console.log(time);


				for(i= 0 ; i<num ; i++){

					speed[i] *= controlFlag[i];
										
					mixer[i].timeScale = 1*Math.sqrt((Math.abs(speed[i])-0.8));

					if(speed[i]==0) mixer[i].timeScale = 0;

					if ( mixer[i] ) mixer[i].update( delta );
	
					renderer.render( scene, camera );
					human[i].position.set(positionX[i],0,positionZ[i]);
						
					}

				for(j=0;j<num;j++){

					if(flag[j]!=speedFlag[j]){

						human[j].rotateY(Math.PI*controlFlag[j]);
						
						flag[j] *= -1;

					} 
						
					if((Math.abs(positionZ[j]) >=1100 )&&antiBugFlag[j]==0) {

						speedFlag[j] *= -1;

						antiBugFlag[j] = 1;

						speed[j] = speedFlag[j]*((Math.random() *( 2 - 1 + 1) ) + 1);
						
					}
					if(positionZ[j]<=900 && positionZ[j]>=-900) antiBugFlag[j] = 0;
					
					positionZ[j] += speed[j];
					//camera
					

				}
				angle += 0.005;
 		
  				var x = 10 * Math.sin(angle)
  		
  				var z = 10 * Math.cos(angle)

 				playFrame ++ ;
				//console.log(playFrame);
				
				if (playFrame % 100 == 0) monitorRotateFlag *= -1 ;
				
				monitorcamera[0].rotateZ(Math.PI*0.002*monitorRotateFlag);
				monitorcamera[0].position.set(-1000, 600+x, 600+z);
				pointLight1.position.set( -800, 532, 576 );//monitor pos

				monitorcamera[1].rotateZ(Math.PI*0.002*monitorRotateFlag*-1);
				monitorcamera[1].position.set(-1000, 600+x, -600+z);
				var xdistance = mouseX-window.innerWidth/2;
				var ydistance =mouseY-window.innerHeight/2;
				pointLight1.position.set( -1000, 400+ydistance*200/innerHeight, xdistance*2000/innerWidth );

				// stats.update();
				BackMaterial.map = getTextCanvas1();

			
				if(endFlag==1) playend1();
				if(endFlag==2) playend2();
				if(endFlag==3) playend3();

				
				
			}}