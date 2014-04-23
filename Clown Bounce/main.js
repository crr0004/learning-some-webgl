var triangleVertextPositionBuffer;
var triangleColorBuffer;
var gl;
var shaderProgram;
var pvm = new PVM();

var htmlScore;
var score = 0;

var mouseEvents = new Array();

var background;

var clown;
var clownPosition;
var clownVelocity = [1,0];
var clownSpeed = 1;


function webGLStart(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousedown", mouseClicked, false);
	htmlScore = document.getElementById("score");

	initGL(canvas);
	initShaders();
	initScene();

	gl.clearColor(0.0, 0.0, 0.5, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);

	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	pvm.setPerspective(gl.viewportWidth, gl.viewportHeight);

	drawScene();
}

function initShaders(){

	shaderProgram = new Shader();
	shaderProgram.create(gl);

	pvm.setUniformLocations(gl, shaderProgram.getID());
}

function setMatrixUniforms(){
	pvm.setMatrixUniforms(gl);
}

function initGL(canvas){
	try{
		gl = canvas.getContext("webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	}catch(e){

	}
	if(!gl){
		alert("Could not initialise webGL.");
	}
}

function initScene(){
	background = new Square(new Vector3(0,0,-1.01), "images/background.png");
	background.create(gl, 1.1);

	clownPosition = new Vector3(0, 0, -1);
	clown = new Square(clownPosition, "images/clown.png");
	clown.create(gl, 0.065);
}

function drawScene(){
	requestAnimFrame(drawScene);
	htmlScore.innerHTML = score;

	pollInput();
	updateClown();

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	background.draw(gl, pvm, shaderProgram);
	clown.draw(gl, pvm, shaderProgram);

}

function pollInput(){ //Having mouse clicks rely on when it happens causes issues with concurreny
	for(var i=0; i < mouseEvents.length; i++){
		processMouseClicked(mouseEvents.pop());
	}
}

function updateClown(){

	if(Math.abs(clownPosition.getX()) >= gl.viewportWidth){
		clownVelocity[0] *= -1;
	}
	if(Math.abs(clownPosition.getY()) >= gl.viewportHeight){
		clownVelocity[1] *= -1;
	}

	clownPosition.setX(clownPosition.getX() + (clownVelocity[0] * clownSpeed));
	clownPosition.setY(clownPosition.getY() + (clownVelocity[1] * clownSpeed));

	clown.setPosition(clownPosition);
}

function testClownClicked(x, y){

	if(clown.getBoundingVolume().pointIntersect(x, y)){
		score += 1;
		clownSpeed += 1;

		clownVelocity[0] = Math.random();
		clownVelocity[1] = Math.random();

		clownPosition.setX(Math.random() * gl.viewportWidth);
		clownPosition.setY(Math.random() * gl.viewportHeight);
	}
}

function mouseClicked(event){
	mouseEvents.push(event);
}

function processMouseClicked(event){

	var canvas = document.getElementById("canvas");
	var x = new Number();
	var y = new Number();

	if (event.x != undefined && event.y != undefined){
          x = event.x;
          y = event.y;
    }else{ // Firefox method to get the position
      x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;



	//Transforms x and y to -1, 1 frame
	x = (x - canvas.width/2)/(canvas.width/2);
	y = canvas.height - y;
	y = (y - canvas.height/2)/(canvas.height/2);

	//Transforms x and y to canvas frame of reference
	x *= canvas.width;
	y *= canvas.height;

	console.log("X: " + x + " Y: " + y);

	testClownClicked(x, y);

}