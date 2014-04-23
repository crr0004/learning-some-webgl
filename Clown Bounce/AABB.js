AABB.prototype.center;
AABB.prototype.halfLengths = [0,0,0];

function AABB(){

}

AABB.prototype.isColliding = function(b){
	if(Math.abs(this.center.getX() - b.center.getX()) > (Math.abs(this.halfLengths[0]) + Math.abs(b.getHalfLengths()[0]))) return false;
	if(Math.abs(this.center.getY() - b.center.getY()) > (Math.abs(this.halfLengths[1]) + Math.abs(b.getHalfLengths()[1]))) return false;
	if(Math.abs(this.center.getZ() - b.center.getZ()) > (Math.abs(this.halfLengths[2]) + Math.abs(b.getHalfLengths()[2]))) return false;

	return true;
};

AABB.prototype.getCenter = function(){
	return this.center;
};

AABB.prototype.getHalfLengths = function(){
	return this.halfLengths;
};

AABB.prototype.setHalfLengths = function(lengths){
	this.halfLengths = lengths;
};

AABB.prototype.setCenter = function(c){
	this.center = c;
};


AABB.prototype.pointIntersect = function(x, y){
	if(Math.abs(this.center.getX() - x) > (Math.abs(this.halfLengths[0]))) return false;
	if(Math.abs(this.center.getY() - y) > (Math.abs(this.halfLengths[1]))) return false;

	return true;
};