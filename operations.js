function combineNumbers(array){
	for(i=0; i<array.length; i++){
		while((array[i+1] != undefined) && array[i].match(/\d/) && array[i+1].match(/\d/)){
			array[i] = array[i] + array[i+1];
			array.splice(i+1,1);
		}
	}
	return array;
};
function removeSpace(array){
	return array.filter(function(x){return x != " ";});
};
function objectify(elm){
	if(operations[elm] !== undefined){
		return elm;
	}
	else{
  		return parseInt(elm);
  	}
}
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