Vector3.prototype.x = 0;
Vector3.prototype.y = 0;
Vector3.prototype.z = 0;

function Vector3(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3.prototype.add = function(vector){
	this.x += vector.x;
	this.y += vector.y;
	this.z += vector.z;
}

Vector3.prototype.setX = function(x){
	this.x = x;
}

Vector3.prototype.getX = function(){
	return this.x;
}

Vector3.prototype.getY = function(){
	return this.y;
}

Vector3.prototype.getZ = function(){
	return this.z;
}