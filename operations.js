// RETURNS TRUE IF THE ELEMENT IS A NUMBER && NOT AN ARRAY
function isNumber(n){
	return !isNaN(parseInt(n)) && !(n instanceof Array);
}


// COMBINES NUMBERS IN THE ARRAY
// [1,3] >> [13]
function combineNumbers(array){
	for(i=0; i<array.length; i++){
		while((array[i+1] != undefined) && array[i].match(/\d/) && array[i+1].match(/\d/)){
			array[i] = array[i] + array[i+1];
			array.splice(i+1,1);
		}
	}
	return array;
};


// REMOVES SPACES FROM THE ARRAY
// [1," ",3] >> [1,3]
function removeSpace(array){
	return array.filter(function(x){return x != " ";});
};

// FINDS THE CORRECT OPERATION IN THE OPERATIONS DICTIONARY
// plus = findOperation("+"); //*RETURNS {name:"+", fn: function(x,y){return x+y;}}*//
var findOperation = function(operatorName) {
  for (var i = 0; i < operations.length; i++) {
    if (operations[i].name === operatorName) {
      return operations[i];
    }
  }
};


// RETURNS THE PARSE OF A NUMBER, OR THE ELEMENT UNCHANGED(OPERATOR)
// ["3"] >> [3]
function objectify(elm){
	if(isNaN(elm)){
		return elm;
	}
	else{
  		return parseInt(elm);
  	}
}


// DICTIONARY FOR OPERATORS
var operations = [{
	name: "^",
	fn: function (x,y){return Math.pow(x,y);}
},{
	name: "*",
	fn: function (x,y){return x*y;}
},{
	name: "/",
	fn: function(x,y){return x/y;}
},{
	name: "+",
	fn: function(x,y){return x + y;}
},{
	name: "-",
	fn: function(x,y){return x - y;}
}]