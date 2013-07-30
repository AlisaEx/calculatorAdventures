function parse(string){
	result = [];
	for (i=0; i<string.length; i++){
		if(string.charAt(i) )
		result.push(string.charAt(i));
	}
	result = removeSpace(result);
	result = combineNumbers(result);
	result = segregate(result);
	result = loopThrough(result);
	result = interpret(result);
	document.getElementById('result').innerHTML = JSON.stringify(result);
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
	return current;
}

function interpret(elm){
	if (typeof elm === 'number'){
		return elm;
	}
	else{
		for (i=0; i<elm.length; i++){
			if(operations[elm[i]]!=undefined){
				elm.splice(i-1,3,operations[elm[i]](interpret(elm[i-1]), interpret(elm[i+1])));
				i--;
			}
		}
	}
	return elm[0];
}

function loopThrough(array){
	for(var i=0; i<array.length; i++){
		if (array[i] instanceof Array){
			array[i] = loopThrough(array[i]);
		}
		else{
			array[i] = objectify(array[i]);
		}
	}
	return array;
}


