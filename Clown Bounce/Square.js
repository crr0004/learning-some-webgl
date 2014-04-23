Square.prototype.vpBuffer = null;
Square.prototype.tBuffer = null;
Square.prototype.position = null;
Square.prototype.texture = null;
Square.prototype.texturePath = "";
Square.prototype.volume;


function Square(position, texturePath){
	this.position = position;
	this.texture = new Texture();
	this.texturePath = texturePath;
	this.volume = new AABB();
}

Square.prototype.setPosition = function(position){
	this.position = position;
}

Square.prototype.create = function(gl, size){
	this.initTexture(gl);

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

	var lengths = [size * (gl.viewportWidth/2), size * (gl.viewportHeight/2), 0];
	//lengths[0] += 20;
	//lengths[1] += 20;
	this.volume.setHalfLengths(lengths);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
	this.vpBuffer.itemSize = 3;
	this.vpBuffer.numItems = 6;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	this.tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
	var textureCords = [
	0, 0,
	0, 1,
	1, 1,
	1, 1,
	1, 0,
	0, 0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCords), gl.STATIC_DRAW);
	this.tBuffer.itemSize = 2;
	this.tBuffer.numItems = 6;
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

Square.prototype.getBoundingVolume = function(){

	this.volume.setCenter(this.position);

	return this.volume;
};

Square.prototype.draw = function(gl, pvm, shader){
	pvm.push();
	shader.use(gl);

	gl.enableVertexAttribArray(shader.getPositionAttribute());
	gl.enableVertexAttribArray(shader.getTextureAttribute());

	pvm.translate(this.position.getX(), this.position.getY(), this.position.getZ());

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vpBuffer);
	gl.vertexAttribPointer(shader.getPositionAttribute(), this.vpBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.tBuffer);
	gl.vertexAttribPointer(shader.getTextureAttribute(), this.tBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture.getId());
	gl.uniform1i(shader.getTextureSamplerUniform(), 0);

	pvm.setMatrixUniforms(gl);
	pvm.pop();

	gl.drawArrays(gl.TRIANGLES, 0, this.vpBuffer.numItems);
};

Square.prototype.initTexture = function(gl){
	this.texture.create(gl, this.texturePath);
}