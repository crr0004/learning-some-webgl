var triangleVertextPositionBuffer;
var triangleColorBuffer;
var gl;
var shaderProgram;
var pvm = new PVM();

var htmlScore;
var score = 0;

var clown;
var clownPosition;


function webGLStart(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousedown", mouseClicked, false);
	htmlScore = document.getElementById("score");

	initGL(canvas);
	initShaders();
	initScene();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
	clownPosition = new Vector3(0, 0, -1);
	clown = new Square(clownPosition, "images/clown.png");
	clown.create(gl, 0.05);
}

function drawScene(){
	requestAnimFrame(drawScene);
	htmlScore.innerHTML = score;

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	clown.draw(gl, pvm, shaderProgram);

}

function testClownClicked(x, y){

	if(clown.getBoundingVolume().pointIntersect(x, y)){
		score += 1;
	}
}

function mouseClicked(event){

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
	y = (y - canvas.height/2)/(canvas.height/2);

	//Transforms x and y to canvas frame of reference
	x *= canvas.width;
	y *= canvas.height;

	console.log("X: " + x + " Y: " + y);

	testClownClicked(x, y);

}