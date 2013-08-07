// Simple JavaScript Calculator
// made by: Alisa Ex

// RETURNS TRUE IF THE ELEMENT IS A NUMBER && NOT AN ARRAY
function isNumber(n){
	return !isNaN(parseInt(n)) && !(n instanceof Array);
}


// Takes a string value as input
// && returns the result of that string

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

var findOperation = function(operatorName) {
  for (var i = 0; i < operations.length; i++) {
    if (operations[i].name === operatorName) {
      return operations[i];
    }
  }
};

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

function applyOperators(array){
	for (var i=0; i < operations.length; i++){
		array = applyOperator(array, operations[i]);
	}
  return array;
}



function applyOperator(array, operator){
	if(array.length === 0){return array;}
	// if(array.length === 1){return array[0];}
  if (array[0] instanceof Array && array[0].length > 1) {
    var evaledArray = applyOperators(array[0]);
    // console.log(evaledArray)
    return applyOperator(evaledArray.concat(
      array.slice(1)), operator);
  } else if(array[1] === operator.name){
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

var plus = findOperation("+");
// console.log("test1:", applyOperator([1, "+", 3, "+", 5], plus));
// console.log("test2:", applyOperator([1, "+", 3, "-", 5, "+", 7], plus));
// console.log("test3:", applyOperator([1, "+", 3, "-", 5, "*", 7, "+", 9], plus));
// console.log("test4:", applyOperators([[1, "+", 3], "-", 5, "*", 7, "+", 9]));
// console.log("test5:", applyOperators([[1, "+", 3, "-", 5], "*", 7, "+", 9]));
console.log("test6:", applyOperators([[1, "*", [3, "-", 5]], "*", 7, "+", 9]));



var evalParentheses = function(array) {
  if (array.length === 0) return [];
  if (array.length === 1) return array[0];
  if (array[0] instanceof Array) { // is array
    applyOperators(array[0]);
    return evalParentheses(evalParentheses(array[0]).concat(
      array.slice(1)));
  } else { // number or operator
  }
};














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
