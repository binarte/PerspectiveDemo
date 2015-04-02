
/**
 * Updates the grid to represent the current points
 */
function calculateGrid(){
	//futch data
		var c1 = circleCoords(p1);
		var c2 = circleCoords(p2);
		var c3 = circleCoords(p3);
		var c4 = circleCoords(p4);
	
	//update outer box
		grid.setAttribute('d',polygon([c1,c2,c3,c4]) + ' z');
		
	//define vanishing points and midpoint
		var i1 = intersection([c1,c4],[c3,c2]);
		var i2 = intersection([c1,c2],[c3,c4]);
		var mp = intersection([c1,c3],[c4,c2]);
		
	//create inner grid and vanishing point lines
		var d = '';
		var done = false;
		//first vanishing point
		if (i1 !== null){
			done = true;
			var castP1,castP2,gridP1,gridP2;
			
			//define points to calculate lines from
			if (lineLen(c1,i1) < lineLen(c3,i1) ) {
				castP1 = c1;
				castP2 = c2;
				gridP1 = c4;
				gridP2 = c3;
			} else {
				castP1 = c3;
				castP2 = c4;
				gridP1 = c2;
				gridP2 = c1;
			}
		
			d += polygon([castP1,i1,castP2]);
			
			//cast mid lines
			if (mp !== null){
				var ep = intersection([i1,mp],[gridP1,gridP2]);
				var cp = intersection([i1,mp],[castP1,castP2]);
				d += polygon([i1,ep]);
				
				
				var mp2 = intersection([castP1,ep],[gridP1,cp]);
				mp2 = intersection([i1,mp2],[gridP1,gridP2]);
				d += polygon([i1,mp2]);				
				
				var mp2 = intersection([castP2,ep],[gridP2,cp]);
				mp2 = intersection([i1,mp2],[gridP1,gridP2]);
				d += polygon([i1,mp2]);
				
				//cast parallel lines if the other vanishing point is absent
				if (i2 === null){
					var lp = {x:mp.x + (gridP1.x - gridP2.x),y:mp.y + (gridP1.y - gridP2.y)};
					var _p1 = intersection([gridP1,castP1],[mp,lp]);
					var _p2 = intersection([gridP2,castP2],[mp,lp]);
					d += polygon([_p1,_p2]);
					
					var _bmp = intersection([_p1,gridP2],[_p2,gridP1]);
					var _ump = intersection([_p1,castP2],[_p2,castP1]);
					
					lp = {x:_bmp.x + (gridP1.x - gridP2.x),y:_bmp.y + (gridP1.y - gridP2.y)};
					_p1 = intersection([gridP1,castP1],[_bmp,lp]);
					_p2 = intersection([gridP2,castP2],[_bmp,lp]);
					d += polygon([_p1,_p2]);
					
					lp = {x:_ump.x + (gridP1.x - gridP2.x),y:_ump.y + (gridP1.y - gridP2.y)};
					_p1 = intersection([gridP1,castP1],[_ump,lp]);
					_p2 = intersection([gridP2,castP2],[_ump,lp]);
					d += polygon([_p1,_p2]);
				}
			}
		}
		//second vanishing point
		if (i2 !== null){
			done = true;
			var castP1,castP2,gridP1,gridP2;
			
			//define points to calculate lines from
			if (lineLen(c2,i2) < lineLen(c1,i2) ) {
				castP1 = c2;
				castP2 = c3;
				gridP1 = c1;
				gridP2 = c4;
			} else {
				castP1 = c1;
				castP2 = c4;
				gridP1 = c2;
				gridP2 = c3;
			}
		
			d += polygon([castP1,i2,castP2]);
			
			//cast mid lines
			if (mp !== null){
				var ep = intersection([i2,mp],[gridP1,gridP2]);
				var cp = intersection([i2,mp],[castP1,castP2]);
				d += polygon([i2,ep]);
				
				
				var mp2 = intersection([castP1,ep],[gridP1,cp]);
				mp2 = intersection([i2,mp2],[gridP1,gridP2]);
				d += polygon([i2,mp2]);				
				
				var mp2 = intersection([castP2,ep],[gridP2,cp]);
				mp2 = intersection([i2,mp2],[gridP1,gridP2]);
				d += polygon([i2,mp2]);
				
				//cast parallel lines if the other vanishing point is absent
				if (i1 === null){
					var lp = {x:mp.x + (gridP1.x - gridP2.x),y:mp.y + (gridP1.y - gridP2.y)};
					var _p1 = intersection([gridP1,castP1],[mp,lp]);
					var _p2 = intersection([gridP2,castP2],[mp,lp]);
					d += polygon([_p1,_p2]);
					
					var _bmp = intersection([_p1,gridP2],[_p2,gridP1]);
					var _ump = intersection([_p1,castP2],[_p2,castP1]);
					
					lp = {x:_bmp.x + (gridP1.x - gridP2.x),y:_bmp.y + (gridP1.y - gridP2.y)};
					_p1 = intersection([gridP1,castP1],[_bmp,lp]);
					_p2 = intersection([gridP2,castP2],[_bmp,lp]);
					d += polygon([_p1,_p2]);
					
					lp = {x:_ump.x + (gridP1.x - gridP2.x),y:_ump.y + (gridP1.y - gridP2.y)};
					_p1 = intersection([gridP1,castP1],[_ump,lp]);
					_p2 = intersection([gridP2,castP2],[_ump,lp]);
					d += polygon([_p1,_p2]);
				}
			}
		}
		
		//no vanishing points, 
		if (!done){
			
			var divxv = (c2.x - c1.x)/4;
			var divyv = (c2.y - c1.y)/4;
			var divxh = (c4.x - c1.x)/4;
			var divyh = (c4.y - c1.y)/4;
			
			for (var i = 1; i <=3; i++){
			
				var _p1 = {x:c1.x+(divxv*i),y:c1.y+(divyv*i)};
				var _p2 = {x:c4.x+(divxv*i),y:c4.y+(divyv*i)};
			
				d += polygon ([_p1,_p2]);
							
				var _p1 = {x:c2.x+(divxh*i),y:c2.y+(divyh*i)};
				var _p2 = {x:c1.x+(divxh*i),y:c1.y+(divyh*i)};
			
				d += polygon ([_p1,_p2]);
			}
		}
		
		l1.setAttribute('d', d );
}

/**
 * Gets point data to represent a polygon
 * @param {Array} points the points to base the polygon from
 * @returns {String}
 */
function polygon(points){
	var out = ' M ';
	for (var i = 0; i < points.length; i++){
		out += points[i].x + ',' + points[i].y + ' ';
	}
	return out;
}

/**
 * Gets the coordinates of a circle
 * @param {SVGCirc} circ circle to get origin from
 * @returns {Object} x/y coordinates
 */
function circleCoords(circ){
	return {x:circ.getAttribute('cx')*1,y:circ.getAttribute('cy')*1};
}

/**
 * Finds the intersection between two lines
 * @param {Array} line1 an array with the starting and ending point of the line
 * @param {Array} line2 an array with the starting and ending point of the line
 * @returns {Object} x/y coordinates of the intersection point, or null if the lines do not intersect 
 */
function intersection(line1,line2){
	var dy;
	
	//normalize lines
	var l1p1 = line1[0];
	var l1p2 = line1[1];
	var l2p1 = line2[0];
	var l2p2 = line2[1];
	
	if (l1p1.x > l1p2.x){
		var aux = l1p1;
		l1p1 = l1p2;
		l1p2 = aux;
	}
	if (l2p1.x > l2p2.x){
		var aux = l2p1;
		l2p1 = l2p2;
		l2p2 = aux;
	}

	//define equation for line 1
	var dx1 = l1p2.x - l1p1.x;
	dy = l1p2.y - l1p1.y;
	var yf1 = dy/dx1;
	var yo1 = l1p1.y - (l1p1.x * yf1);

	//define equation for line 2
	var dx2 = l2p2.x - l2p1.x;
	dy = l2p2.y - l2p1.y;
	var yf2 = dy/dx2;
	var yo2 = l2p1.y - (l2p1.x * yf2);
	
	//return null if lines do not cross
	if (yf1 === yf2 || (dx1 === 0 && dx2 === 0) ){
		return null;
	}
	
	if (dx1 === 0){
		return intersectionVertical(l1p1.x,yo2,yf2);
	}
	if (dx2 === 0){
		return intersectionVertical(l2p1.x,yo1,yf1);
	}
	
	var fdif = yf2 - yf1;
	var pdif = yo1 - yo2;
	if (fdif < 0){
		fdif = -fdif;
		pdif = -pdif;
	}
	
	var posx = pdif / fdif;
	var posy = yo1 + (posx * yf1);
	
	return {x:posx,y:posy};
}

/**
 * Gets intersection between a diagonal line and a vertical line
 * @param {Number} posx x-coordinate of the vertical line
 * @param {Number} yo2 y-offset of the line
 * @param {Number} yf2 line inclinatios
 * @returns {Object} x/y coordinates of the intersection
 */
function intersectionVertical(posx,yo2,yf2){
	var posy = yo2 + yf2 * posx;
	
	return {x:posx,y:posy}; 
}

/**
 * Gets the length of a line segment
 * @param {Object} p_1 first point of the line in x/y coordinates
 * @param {Object} p_2 second point of the line in x/y coordinates
 * @returns {Number}
 */
function lineLen(p_1,p_2){
	var x = p_1.x - p_2.x;
	var y = p_1.y - p_2.y;
	return Math.sqrt( (x*x) + (y*y) );
}


//setup global variables
var l1 = document.getElementById('Line1');
var l2 = document.getElementById('Line2');

var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');
var grid = document.getElementById('GridBase');

var selCursor = false;
var cursorMoveStart = function(){
	selCursor = this;
};
var cursorMoveStop = function(){
	selCursor = false;
};

//initiate
p1.addEventListener("mousedown",cursorMoveStart);
p1.addEventListener("mouseup",cursorMoveStop);
p2.addEventListener("mousedown",cursorMoveStart);
p2.addEventListener("mouseup",cursorMoveStop);
p3.addEventListener("mousedown",cursorMoveStart);
p3.addEventListener("mouseup",cursorMoveStop);
p4.addEventListener("mousedown",cursorMoveStart);
p4.addEventListener("mouseup",cursorMoveStop);

calculateGrid();

window.addEventListener("mousemove",function(evt){
	if (selCursor){
		selCursor.setAttribute('cx',evt.clientX);
		selCursor.setAttribute('cy',evt.clientY);
		
		calculateGrid();
	}
});
