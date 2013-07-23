function parse(string){
	result = [];
	for (i=0; i<string.length; i++){
		result.push(string.charAt(i));
	}
	result = removeSpace(result);
	result = combineNumbers(result);
	interpret(result);
}
function interpret(array, index){
	var current = [];
	if (index === undefined){ index = 0;};
	for(i=index; i<array.length; i++){
		if(array[i].match(/\(/)){
			i++;
			stuff = interpret(array, i);
			current.push(stuff[0]);
			i = stuff[1];
		}
		else if (array[i].match(/\)/)){
			return [current, i];
		}
		else{
			current.push(array[i]);
		}
	}
	console.log(result);
	console.log(current);
}
function removeSpace(array){
	return array.filter(function(x){return x != " ";});
}
function combineNumbers(array){
	for(i=0; i<array.length; i++){
		while((array[i+1] != undefined) && array[i].match(/\d/) && array[i+1].match(/\d/)){
			array[i] = array[i] + array[i+1];
			array.splice(i+1,1);
		}
	}
	return array;
}
function removeQuotes(string){
	for(i=0; i<string.length; i++){
		if(string == "+"){
			return string.charAt(i);
		}
		else{
			return JSON.parse(string);
		}
	}
}