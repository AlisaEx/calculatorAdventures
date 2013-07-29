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
	index = (index === undefined) ? 0 : index;
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

	loopThrough(current);
}

function doParen(array,index){
	index = (index === undefined) ? 0 : index;
	for (i=index; i<array.length; i++){
		if(array[i] instanceof Array){
			for(j=0;j<array[i].length;j++){
				if(array[i][j]==="+"){
					array[i] = add(array[i][j-1], array[i][j+1]);
				}
			}
		}
	}
	interpret(array);
}
function interpret(array, index){
	current = [];
	index = (index === undefined) ? 0 : index;
	for (i=index; i<array.length; i++){
		if(array[i] != "+"){
			current.push(array[i]);
		}
	}
	document.getElementById('result').innerHTML = JSON.stringify(current.reduce(add));
}

function loopThrough(array){
	for(i=0; i<array.length; i++){
		if (array[i] instanceof Array){
			for (j=0; j<array[i].length; j++){
				array[i][j] = objectify(array[i][j]);
			}
		}
		else{
			array[i] = objectify(array[i]);
		}
	}
	doParen(array);
}
