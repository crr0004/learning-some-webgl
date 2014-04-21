var triangleVertextPositionBuffer;
var triangleColorBuffer;
var gl;
var shaderProgram;
var pvm = new PVM();
var triangle;
var trianglePos = new Vector3(0, 0, -1);
var triangleDir = 1;

function webGLStart(){
	var canvas = document.getElementById("canvas");

	initGL(canvas);
	initShaders();
	initBuffers();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

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

function initBuffers(){

	triangle = new Square(trianglePos);
	triangle.create(gl, 0.1);
}

function drawScene(){
	requestAnimFrame(drawScene);

	if(trianglePos.getX() >= 500){
		triangleDir = -1;
	}else if(trianglePos.getX() <= -500){
		triangleDir = 1;
	}

	trianglePos.setX(trianglePos.getX() + (5 * triangleDir));

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	triangle.draw(gl, pvm, shaderProgram);
}