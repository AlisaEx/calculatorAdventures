function removeQuotes(string){
	if(string === "+"){
		return string.charAt(0);
	}
	else{
		return JSON.parse(string);
	}
};
function combineNumbers(array){
	for(i=0; i<array.length; i++){
		while((array[i+1] != undefined) && array[i].match(/\d/) && array[i+1].match(/\d/)){
			array[i] = array[i] + array[i+1];
			array.splice(i+1,1);
		}
	}
	return array;
};
function add(x, y){
	if(typeof x === 'number' && typeof y === 'number'){
		return x+y;
	}
	// else{
	// 	throw "Oh no";
	// }
};
function addToArray(array,item){
	if (item != undefined && item != "+"){
		array.push(item);
	}
};
function removeSpace(array){
	return array.filter(function(x){return x != " ";});
};
function objectify(elm){
	if(elm != "+"){
		return JSON.parse(elm);
	}
	else{
		return elm;
	}
}

var operations = [{
	key: "+",
	value: function(x,y){
		return x + y;
}},{
	key: "-",
	value: function(x,y){
		return x - y;
}},{
	key: "/",
	value: function(x,y){
		return x/y;
}},{
	key: "*",
	value: function(x,y){
		return x*y;
}}]