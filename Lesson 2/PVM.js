PVM.prototype.matrixStack = [];
PVM.prototype.mvMatrix = mat4.create();
PVM.prototype.pMatrix = mat4.create();
PVM.prototype.mvMatrixUniformLocation = -1;
PVM.prototype.pMatrixUniformLocation = -1;

function PVM(){

}

PVM.prototype.setPerspective = function(viewportWidth, viewportHeight){
	mat4.perspective(45, viewportWidth / viewportHeight, 0.1, 100.0, this.pMatrix);
};

PVM.prototype.setUniformLocations = function(gl, shaderProgram){
	this.pMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uPMatrix");
	this.mvMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uMVMatrix");
};

PVM.prototype.setMatrixUniforms = function(gl){
	gl.uniformMatrix4fv(this.pMatrixUniformLocation, false, this.pMatrix);
	gl.uniformMatrix4fv(this.mvMatrixUniformLocation, false, this.mvMatrix);
};

PVM.prototype.translate = function(x, y, z){
	mat4.translate(this.mvMatrix, [x, y, z]);
};

PVM.prototype.pop = function(){
	this.mvMatrix = this.matrixStack.pop();
};

PVM.prototype.push = function(){
	matrixToStore = mat4.create();
	mat4.set(this.mvMatrix, matrixToStore);
	this.matrixStack.push(matrixToStore);
	mat4.identity(this.mvMatrix);
};