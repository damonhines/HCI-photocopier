console.log("Login Stage")
let codeNumber = ""
let displayNum = "****"
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
  login()
}

function login(){
  if(codeNumber.length!=4){
    flashText();
  }
  else{
    //PLACEHOLDER
    document.location.href = 'instructions.html';
  }
}

function removeNumber() {
    codeNumber = codeNumber.slice(0, -1)
    renderCode();
}


function clickNumber(num) {

  if(codeNumber.length >= 4){
    flashText();
    return;
  }
  codeNumber = codeNumber + (num);
  renderCode();
}

function clickCopies(num) {

  codeNumber = codeNumber + (num);
  renderCopies();
}

function renderCopies(){
  displayNum = codeNumber;
  console.log(codeNumber);
}

function renderCode() {
  displayNum = codeNumber;
  //Add * until 4 digits are achived.
  while(displayNum.length<4){
    displayNum = displayNum + "*"
  }
  document.getElementById("protected-text").textContent = displayNum;
  console.log(codeNumber);
}

function flashText(){
  document.getElementById("protected-text").style="color:red";
  console.log("do not enter more")
  setTimeout(function()
  { document.getElementById("protected-text").style="color:darkgray"; }, 500);
}
