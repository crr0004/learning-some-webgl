Square.prototype.vpBuffer = null;
Square.prototype.tBuffer = null;
Square.prototype.position = null;


function Square(position){
	this.position = position;
}

Square.prototype.setPosition = function(){
	this.position = position;
}

Square.prototype.create = function(gl, size){
	this.vpBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vpBuffer);

	var triangleVertices = [
			-1 * size, -1 * size, 0,
			-1 * size, 1 * size, 0,
			1 * size, 1 * size, 0,
			1 * size, 1 * size, 0,
			1 * size, -1 * size, 0,
			-1 * size, -1 * size, 0

	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	this.vpBuffer.itemSize = 3;
	this.vpBuffer.numItems = 6;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	this.tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
	var colors = [
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	1.0, 0.0, 0.0, 1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	this.tBuffer.itemSize = 4;
	this.tBuffer.numItems = 6;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

Square.prototype.draw = function(gl, pvm, shader){
	pvm.push();
	shader.use(gl);

	gl.enableVertexAttribArray(shader.getPositionAttribute());
	gl.enableVertexAttribArray(shader.getColorAttribute());

	pvm.translate(this.position.getX(), this.position.getY(), this.position.getZ());

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vpBuffer);
	gl.vertexAttribPointer(shader.getPositionAttribute(), this.vpBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
	gl.vertexAttribPointer(shader.getColorAttribute(), this.tBuffer.itemSize, gl.FLOAT, false, 0, 0);

	pvm.setMatrixUniforms(gl);
	pvm.pop();

	gl.drawArrays(gl.TRIANGLES, 0, this.vpBuffer.numItems);
};