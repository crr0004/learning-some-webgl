Texture.prototype.id;
Texture.prototype.image;

function Texture(){

}

function handleLoad(gl, id, data){
	console.log(id);
}

Texture.prototype.create = function(gl, imagesrc){
	this.id = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, this.id);
	/*gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 255])); // red
*/
	this.image = new Image();
	var texture = this;
	this.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, texture.id);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
		/*gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 255, 0, 255])); // green*/
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
	};
	this.image.crossOrigin = "anonymous";
	this.image.src = imagesrc;
};

Texture.prototype.getId = function(){
	return this.id;
};