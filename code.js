//global variables
var firstMove = true;
var isFinished = false;
var currColor = "#ff0000";
var initHex = 0xFF0000;
var stringMat = "";
//total number of times colors are changed
var numChanges = 0;
//interval per side of the RGB color cube
var n = 3;
//number of movement on the side of the cube
var numberMovement = n + 1;
//create matrix that has values of repetitions needed to be made per side of the RGB cube
var matrix = new Array(6);
for (let i = 0; i < 6; i++){
  matrix[i] = new Array(n + 1);
  for(let j = 0; j < n + 1; j++, numberMovement--){
  	matrix[i][j] = numberMovement;
    stringMat = stringMat + matrix[i][j].toString() + " ";
  }
  if(i === 4){
  	numberMovement = n - 1;
  }
  else{
  	numberMovement = n;
  }
  stringMat = stringMat + "\n";
}
//if n = 3, the matrix will have these values
/*4 3 2 1 
  3 2 1 0
  3 2 1 0
  3 2 1 0
  3 2 1 0
  2 1 0 -1*/
//indexes for matrix
var round = 0; //represents how many times the path has traveled through the cube. works as column num in matrix
var side = 0; //side of the cube. determines what operation has to be taken to the color. works as row num in matrix.
//counter for repetitions needed per face of the cube
var repCounter = 0;

//for determining complementary color
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

//Aids intToStringHex when working with zeroes
function repeatDigit(digit, reps){
	let digits = "";
	for(let i = 0; i < reps; i++){
		digits = digits + digit.toString();
	}
	return digits;
}

//change style values
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
  numChanges++;
}

//does the arithmetic operations for changing color, depending on which face of the cube it is in
function changeColor(hex, side){
	let intColor = stringToIntHex(hex); //string changed to int, placeholder
	switch(side){
		case 0:
        if(firstMove){
          assignValues();
          firstMove = false;
        }
        else{
          intColor = intColor + 0xFF / n; // add blue
          currColor = intToStringHex(Math.floor(intColor));
          assignValues();
        }
        repCounter++;
			break;
    case 1:
        intColor = intColor - 0xFF0000 / n;// subtract red
        currColor = intToStringHex(Math.floor(intColor));
        assignValues();
        repCounter++;
      break;
     case 2:
        intColor = intColor + 0xFF00 / n; // add green
        currColor = intToStringHex(Math.floor(intColor));
        assignValues();
        repCounter++;
      break;
    case 3:
        intColor = intColor - 0xFF / n; // subtract blue
        currColor = intToStringHex(Math.floor(intColor));
        assignValues();
        repCounter++;
      break;
    case 4:
        intColor = intColor + 0xFF0000 / n; // add red
        currColor = intToStringHex(Math.floor(intColor));
        assignValues();
        repCounter++;
      break;
    case 5:
        intColor = intColor - 0xFF00 / n; // subtract green
        currColor = intToStringHex(Math.floor(intColor));
        assignValues();
        repCounter++;
      break;
	}
}

function color(){
  if(isFinished){
    alert("Path finished, ended in white!");
  }
  else if(round < n + 1){
    if(side < 6){
      if(repCounter >= matrix[side][round]){ 
        repCounter = 0;
        side++;
      }
    }
    if(side == 6){ 
      side = 0;
      round++;
    }
    if(round == n - 1 && side == 5){
      side = 0;
      isFinished = true;
    }
    changeColor(currColor, side);
  }
}