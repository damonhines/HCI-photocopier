console.log("Printing Stage")

let numCopies = "";
let brightnessVal = 50;
let sides = "1 -> 1";
//NUMBERS MODAL
let numbersModal = document.getElementById("numbersModal");


document.getElementById("numberbutton").onclick= function(){
  numbersModal.style.display= 'block'
}

document.getElementById("closeNum").onclick= function(){
  numbersModal.style.display='none'
}






//BRIGHTNESS
let brighModal = document.getElementById("brightModal");

document.getElementById("brightBox").onclick= function(){
  brightModal.style.display= 'block'
}

document.getElementById("closeBright").onclick= function(){
  brightModal.style.display='none'
}

//BRIGHTNESS MODAL
let brightSlider = document.getElementById("brightness");

brightSlider.onchange = function(){
  brightnessVal = Math.round(brightSlider.value*100);
  document.getElementById('brightInfo').innerHTML="Brightness: " + String(brightnessVal) + "%";
  document.getElementById('brightness-text').innerHTML = String(brightnessVal) + "%";
}

document.getElementById("subBright").onclick= function(){
  brightModal.style.display='none'
}

//SIDES

let sidesModal = document.getElementById("sidesModal");

document.getElementById("sidesBox").onclick= function(){
  sidesModal.style.display= 'block'
}

document.getElementById("closeSides").onclick= function(){
  sidesModal.style.display='none'

}
document.getElementById("subSides").onclick= function(){
  sidesModal.style.display='none'
}

//SIDES SELECTION BOX
function setUpSidesEntry(){
  let b11 = document.getElementById('1b1Cell')
  let b12 = document.getElementById('1b2Cell')
  let b21 = document.getElementById('2b1Cell')
  let b22 = document.getElementById('2b2Cell')
  
  b11.style.border = "3px solid blue";
  b11.onclick=function(){
    b11.style.border = 	"3px solid blue";
    b12.style.border = 	"1px solid #999999";
    b22.style.border = 	"1px solid #999999";
    b21.style.border = 	"1px solid #999999";
    sides = "1 -> 1";
    renderSides()
  }

  b12.onclick=function(){
    b12.style.border = 	"3px solid blue";
    b11.style.border = 	"1px solid #999999";
    b22.style.border = 	"1px solid #999999";
    b21.style.border = 	"1px solid #999999";
    sides = "1 -> 2";
    renderSides()
  }

  b22.onclick=function(){
    b22.style.border = 	"3px solid blue";
    b12.style.border = 	"1px solid #999999";
    b11.style.border = 	"1px solid #999999";
    b21.style.border = 	"1px solid #999999";
    sides = "2 -> 2";
    renderSides()
  }

  b21.onclick=function(){
    b12.style.border = 	"1px solid #999999";
    b22.style.border = 	"1px solid #999999";
    b11.style.border = 	"1px solid #999999";
    b21.style.border = 	"3px solid blue";
    sides = "2 -> 1";
    renderSides()
  }
}

setUpSidesEntry();


//NUMBERS BOX

function setUpNumberEntry() {
  document.getElementById('1button').addEventListener('click', () => {
    clickNumber("1");
  })
  document.getElementById("2button").onclick = function () {
    clickNumber("2");
  }
  document.getElementById("3button").onclick = function () {
    clickNumber("3");
  }
  document.getElementById("4button").onclick = function () {
    clickNumber("4");
  }
  document.getElementById("5button").onclick = function () {
    clickNumber("5");
  }
  document.getElementById("6button").onclick = function () {
    clickNumber("6");
  }
  document.getElementById("7button").onclick = function () {
    clickNumber("7");
  }
  document.getElementById("8button").onclick = function () {
    clickNumber("8");
  }
  document.getElementById("9button").onclick = function () {
    clickNumber("9");
  }
  document.getElementById("0button").onclick = function () {
    clickNumber("0");
  }
  document.getElementById("Backbutton").onclick = function () {
    removeNumber()
  }
  document.getElementById("login").onclick = function () {
    enterNum()
  }
}

setUpNumberEntry();

function enterNum() {
  numbersModal.style.display='none'
}


function removeNumber() {
    numCopies = numCopies.slice(0,-1)
    renderNumCopies();
  }


function clickNumber(num) {
    numCopies = numCopies + (num);
    renderNumCopies();
}

function renderNumCopies(){
  let displayCopies = "0";
  if(numCopies !=""){
    displayCopies = numCopies;
  }
  document.getElementById("numCopies-text").textContent = displayCopies;
  document.getElementById("numberbutton").innerHTML = "Number of Copies: " + displayCopies;

}

function renderSides(){
  document.getElementById("sidesInfo").innerHTML = sides;
}

function showDIV() {
	var x = document.getElementById("showonselection");
	x.style.display = "inline-block"
  }
  
  function hideDIV() {
	var x = document.getElementById("showonselection");
	x.style.display = "none"
  }