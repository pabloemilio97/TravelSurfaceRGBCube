var factors = new Array();
var firstMove = true;
var currColor = "#ff0000";
var initHex = 0xFF0000;
//Total number of times colors are changed
var counter = 0;
//interval per side of the RGB color cube
var n = 3;
//number of movement on the side of the cube
var numberMovement = n + 1;
//Create matrix that has values of repetitions needed to be made per algorithm
var matrix = new Array(6);
for (let i = 0; i < 6; i++){
  matrix[i] = new Array(n + 1);
  for(let j = 0; numberMovement > -1; j++, numberMovement--){
  	matrix[i][j] = numberMovement;
  }
  if(i === 4){
  	numberMovement = n - 1;
  }
  else{
  	numberMovement = n;
  }
}
//asign 0 value to right inferior corner
matrix[5][n] = 0;

function getFactors(number){
  //for(let i = 0; )
}
function nearestFactor(numberToConvert, factorNumber){

}
function getComplementary(hex){
	let intHex = stringToIntHex(hex);
	let complementary = (0xFFFFFF ^ intHex);
	return intToStringHex(complementary);
}
function stringToIntHex(hex){
	return parseInt(hex.replace(/^#/, ''), 16);
}
function intToStringHex(hex){
	let stringHex = hex.toString(16);
	let numZeroes = 6 - stringHex.length;
	if(numZeroes === 0){
		return "#" + stringHex;
	}
	else if(numZeroes < 0){
		return "#" + stringHex.slice(-6);
	}
	else{
		return "#" + repeatDigit(0, numZeroes) + stringHex;
	}

}
function repeatDigit(digit, reps){
	let digits = "";
	for(let i = 0; i < reps; i++){
		digits = digits + digit.toString();
	}
	return digits;
}
function assignValues(){
	//Change value of current color and set the main background to it
	document.getElementById("title").style.backgroundColor = currColor;
	//Set the background for text to complementary color
	document.getElementById("info").style.backgroundColor = getComplementary(currColor);
	document.getElementById("btn").style.backgroundColor = getComplementary(currColor);
	//Set text color
	document.getElementById("title").style.color = getComplementary(currColor);
	document.getElementById("info").style.color = currColor;
	document.getElementById("btn").style.color = currColor;
	//Change text to display current colors
	document.getElementById("titletext").innerHTML = currColor;
	document.getElementById("info").innerHTML = getComplementary(currColor);
  counter++;
}
function changeColor(hex, side, round, reps){
	let intColor = stringToIntHex(hex); //string changed to int, placeholder
	//let newColor; //placeholder
	switch(side){
		case 0:
			for(let i = 0; i < reps; i++){
        //alert("m");
        //setTimeout(function(){
          if(firstMove){
            //assignValues();
            //alert("Side: " + side);
            firstMove = false;
          }
          else{
            if(round === n){
              intColor = 0xFFFFFF;
            }
            else{
              intColor = intColor + 0xFF / n; // add blue
            }
    				currColor = intToStringHex(Math.floor(intColor));
            assignValues();
            //alert("Side: " + side);
          }
        //}, 500);
      }
			 break;
    case 1:
    	for(let i = 0; i < reps; i++){
        //setTimeout(function(){
    			intColor = intColor - 0xFF0000 / n;// subtract red
    			currColor = intToStringHex(Math.floor(intColor));
    			assignValues();
          //alert("Side: " + side);
        //}, 500);
      }
      break;
     case 2:
     	for(let i = 0; i < reps; i++){
        //setTimeout(function(){
     			intColor = intColor + 0xFF00 / n; // add green
     			currColor = intToStringHex(Math.floor(intColor));
     			assignValues();
          //alert("Side: " + side);
        //}, 500);
      }
      break;
    case 3:
    	for(let i = 0; i < reps; i++){
        //setTimeout(function(){
    			intColor = intColor - 0xFF / n; // subtract blue
    			currColor = intToStringHex(Math.floor(intColor));
    			assignValues();
          //alert("Side: " + side);
        //}, 500);
      }
      break;
    case 4:
    	for(let i = 0; i < reps; i++){
        //setTimeout(function(){
    			intColor = intColor + 0xFF0000 / n; // add red
    			currColor = intToStringHex(Math.floor(intColor));
    			assignValues();
          //alert("Side: " + side);
        //}, 500);
      }
      break;
    case 5:
      	for(let i = 0; i < reps; i++){
        //setTimeout(function(){
    			intColor = intColor - 0xFF00 / n; // subtract green
    			currColor = intToStringHex(Math.floor(intColor));
    			assignValues();
          //alert("Side: " + side);
        //}, 500);
      }
      break;
	}
/*
	//Precautions
	if(intColor > 0xFFFFFF){
		newColor = 0xFFFFFF % intColor;
		currColor = intToStringHex(newColor);
		alert(currColor);
	}
	if (newColor < 0){
		newColor = newColor * -1;
		currColor = intToStringHex(newColor);
	}
	return intToStringHex(newColor);
*/
}

function color(){
  //document.getElementById('btn').remove();
	//Access values on matrix column by column
	for(let column = 0; column < (n + 1); column++){
		for(let row = 0; row < 6; row++){
			//Change value of current color and set the main background to it
      changeColor(currColor, row, column, matrix[row][column]);
		}
	}
  //alert(counter);
}
