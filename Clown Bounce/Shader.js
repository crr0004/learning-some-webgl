Shader.prototype.iD = -1;
Shader.prototype.viD = -1;
Shader.prototype.fiD = -1;
Shader.prototype.vertexPositionAttribute;
Shader.prototype.vertexColorAttribute;
Shader.prototype.textureSamplerUniform;

function Shader(){

}

Shader.prototype.create = function(gl){
	this.fiD = this.getShader(gl, "shader-fs");
	this.viD = this.getShader(gl, "shader-vs");

	this.iD = gl.createProgram();
	gl.attachShader(this.iD, this.viD);
	gl.attachShader(this.iD, this.fiD);
	gl.linkProgram(this.iD);

	if(!gl.getProgramParameter(this.iD, gl.LINK_STATUS)){
		alert("Couldn't initialise shaders");
	}

	gl.useProgram(this.iD);

	this.vertexPositionAttribute = gl.getAttribLocation(this.iD, "aVertexPosition");
	this.vertexColorAttribute = gl.getAttribLocation(this.iD, "aTextureCoord");
	this.textureSamplerUniform = gl.getUniformLocation(this.iD, "uSampler");

	gl.useProgram(null);
}

Shader.prototype.getShader = function(gl, id){
	var shaderScript = document.getElementById(id);
	if(!shaderScript){
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while(k){
		if (k.nodeType == 3)
			str += k.textContent;
		k = k.nextSibling;
	}

	var shader;
	if(shaderScript.type == "x-shader/x-fragment"){
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}else if(shaderScript.type == "x-shader/x-vertex"){
		shader = gl.createShader(gl.VERTEX_SHADER);
	}else{
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

Shader.prototype.use = function(gl){
	gl.useProgram(this.iD);
}

Shader.prototype.getID = function(){
	return this.iD;
}

Shader.prototype.getPositionAttribute = function(){
	return this.vertexPositionAttribute;
}

Shader.prototype.getTextureAttribute = function(){
	return this.vertexTextureAttribute;
}

Shader.prototype.getTextureSamplerUniform = function(){
	return this.textureSamplerUniform;
}