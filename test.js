function parse(string){
	result = [];
	for (i=0; i<string.length; i++){
		if(string.charAt(i) )
		result.push(string.charAt(i));
	}
	result = removeSpace(result);
	result = combineNumbers(result);
	console.log(result);
	result = segregate(result);
	console.log(result);
	result = loopThrough(result);
	result = interpret(result);
	document.getElementById('result').innerHTML = JSON.stringify(result);
}


function segregate(array){
	var current = [];
	while(array.length !== 0){
		if(array[0].match(/\(/)){
			array.shift();
			paren = segregate(array);
			current.push(paren);
			array.shift();
		}
		else if (array[0].match(/\)/)){
			return current;
		}
		else{
			current.push(array.shift());
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

function orderOperation(array){
	for (i=0 i< operations.length; i++){
		array = applyOperator(array,operations[i]);
	}
}
function applyOperator(array, operator){
	if(array.length === 0){return array;}
	if(array.length === 1){return array[0];}
	if(array[1] === operator.name){
		var answer = operator.fn(array[0], array[2]);
		var rest = array.slice(3,-1);
		return applyOperator([answer].concat(rest),operator);
	}
	else{
		var start = array.slice(0,2);
		var rest = array.slice(3,-1);
		return start.concat(applyOperator(rest,operator));
	}
}

// function addOrder(elm, par){
// 	var parenCount = par;
// 	for (i=0; i<order[elm]-1; i++){
// 		parenCount += par;
// 	}
// 	return parenCount;
// }

// function orderOps(array){
// 	for (i=0; i<array.length;i++){
// 		if(operations[array[i]]!=undefined){
// 			array.splice(array[i-1],0,addOrder(array[i], "("));
// 			array.splice(array[i+1],0,addOrder(array[i], ")"));
// 		}
// 	}
// }


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


