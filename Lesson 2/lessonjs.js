var triangleVertextPositionBuffer;
var triangleColorBuffer;
var gl;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var shaderProgram;
var pvm = new PVM();

function webGLStart(){
	var canvas = document.getElementById("canvas");

	initGL(canvas);
	initShaders();
	initBuffers();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	drawScene();
}

function initShaders(){
	/*var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Couldn't initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");*/

	shaderProgram = new Shader();
	shaderProgram.create(gl);

	pvm.setUniformLocations(gl, shaderProgram.getID());
}

function setMatrixUniforms(){
	pvm.setMatrixUniforms(gl);
	/*gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);*/
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

	triangleVertextPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertextPositionBuffer);

	var triangleVertices = [
			-1, -1, 0,
			-1, 1, 0,
			1, 1, 0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	triangleVertextPositionBuffer.itemSize = 3;
	triangleVertextPositionBuffer.numItems = 3;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	triangleColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
	var colors = [
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	triangleColorBuffer.itemSize = 4;
	triangleColorBuffer.numItems = 3;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

}

function drawScene(){
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	/*mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);*/
	pvm.setPerspective(gl.viewportWidth, gl.viewportHeight);

	/*mat4.identity(mvMatrix);*/
	pvm.push();
	shaderProgram.use(gl);

	/*gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);*/

	gl.enableVertexAttribArray(shaderProgram.getPositionAttribute());
	gl.enableVertexAttribArray(shaderProgram.getColorAttribute());

	/*mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);*/
	pvm.translate(-1.5, 0.0, -7.0);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertextPositionBuffer);
	/*gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertextPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);*/
	gl.vertexAttribPointer(shaderProgram.getPositionAttribute(), triangleVertextPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
	/*gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleColorBuffer.itemSize, gl.FLOAT, false, 0, 0);*/
	gl.vertexAttribPointer(shaderProgram.getColorAttribute(), triangleColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

	setMatrixUniforms();
	pvm.pop();

	gl.drawArrays(gl.TRIANGLES, 0, triangleVertextPositionBuffer.numItems);

}