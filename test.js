function parse(string){
	result = [];
	for (i=0; i<string.length; i++){
		result.push(string.charAt(i));
	}
	result = removeSpace(result);
	result = combineNumbers(result);
	segregate(result);
}
function segregate(array, index){
	var current = [];
	if (index === undefined){ index = 0;};
	for(i=index; i<array.length; i++){
		if(array[i].match(/\(/)){
			i++;
			stuff = segregate(array, i);
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
	console.log(current);
	loopThrough(current);
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
	if(string === "+"){
		return string.charAt(0);
	}
	else{
		return JSON.parse(string);
	}
}

function interpret(array){
	current = [];
	for (i=0; i<array.length; i++){
		if(array[i] instanceof Array && array[i].length > 0){
			for (j=0; j<array[i].length; j++){
				if(array[i][j]==="+"){
					addToArray(current, (add(array[i][j-1], array[i][j+1])))

				}
			}
		}
		if(array[i]==="+"){
			addToArray(current, (add(array[i-1], array[i+1])))
			}
		}
	console.log(current);
	current.reduce(add);
	console.log(current.reduce(add));
}

function loopThrough(array){
	for(i=0; i<array.length; i++){
		if (array[i] instanceof Array){
			for (j=0; j<array[i].length; j++){
					if(array[i][j] != "+"){
						array[i][j] = JSON.parse(array[i][j]);
					}
			}
		}
		else{
			if(array[i] != "+"){
				array[i] = JSON.parse(array[i]);
			}
		}
	}
	console.log(array);
	interpret(array);
}

function add(x, y){
	if(typeof x === 'number' && typeof y === 'number'){
		return x+y;
	}
}
function addToArray(array,item){
	if (item != undefined){
		array.push(item);
	}
}