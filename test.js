// Simple JavaScript Calculator
// made by: Alisa Ex



// Takes a string value as input
// && returns the result of that string

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
	result = orderOperation(result);
	document.getElementById('result').innerHTML = JSON.stringify(result);
}

// RETURNS NEW ARRAY WITH NESTED ARRAYS INSTEAD OF PARENTHESIS
// [1, +, (, 5, +, 3, )] >> [1, +, [5,+,3]]
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

// function evalParenthesis(array){
// 	for(i=0;i<array.length;i++){
// 		if(array[i] instanceof Array){
// 			evalParenthesis(array[i])
// 		}
// 	}
// }

// function slamacow(array){
// 	var first = array[0];
// 	var rest = array.slice(1,-1);
// 	if(array.length === 0){return array;}
// 	if(array.length === 3 && isNumber(array[0]) && isNumber(array[2])){
// 		var answer = applyOperator()
// 	}
// }

function orderOperation(array){
	for (name in operations){
		array = applyOperator(array,operations[i]);
	}
}
function applyOperator(array, operator){
	if(array.length === 0){
		return array;}
	if(array.length === 1){
		return array[0];
	}
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


// RETURNS ARRAY AFTER NUMBER PARSING
// ["1","13","33"] >> [1,13,33]
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


