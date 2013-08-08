// Simple JavaScript Calculator
// made by: Alisa Ex

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
	document.getElementById('result').innerHTML = JSON.stringify(result[0]);
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


function orderOperation(array){
	for (name in operations){
		array = applyOperator(array,operations[name]);
  	}
  	return array;
}



function applyOperator(array, operator){
	if(array.length === 0){return array;}
	// if(array.length === 1){return array[0];}
  	if (array[0] instanceof Array && array[0].length > 1) {
    	var evaledArray = orderOperation(array[0]);
    	// console.log(evaledArray)
    	return applyOperator(evaledArray.concat(
      	array.slice(1)), operator);
  }
  	else if(array[1] === operator.name){
		var answer = operator.fn(array[0], array[2]);
		var rest = array.slice(3);
		return applyOperator([answer].concat(rest),operator);
	}
	else {
		var start = array.slice(0,2);
		var rest = array.slice(2);
		return start.concat(applyOperator(rest, operator));
	}
}

// TESTS
// var plus = findOperation("+");
// // console.log("test1:", applyOperator([1, "+", 3, "+", 5], plus));
// // console.log("test2:", applyOperator([1, "+", 3, "-", 5, "+", 7], plus));
// // console.log("test3:", applyOperator([1, "+", 3, "-", 5, "*", 7, "+", 9], plus));
// // console.log("test4:", orderOperation([[1, "+", 3], "-", 5, "*", 7, "+", 9]));
// // console.log("test5:", orderOperation([[1, "+", 3, "-", 5], "*", 7, "+", 9]));
// console.log("test6:", orderOperation([[1, "*", [3, "-", 5]], "*", 7, "+", 9]));




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
