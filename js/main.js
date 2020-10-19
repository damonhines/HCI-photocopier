const ctx = new (window.AudioContext || window.webkitAudioContext)()
const fft = new AnalyserNode(ctx, { fftSize: 2048 })
createWaveCanvas({ element: 'section', analyser: fft })
const startButton = document.getElementById('main_button');
const instructions = document.getElementById('instructions');
const volumeSlider = document.getElementById('volume');
//Start the oscillator
//State defines the state of the test, button has different effect depending on state
let state = 1;
let oscillator = ctx.createOscillator();
let oscGain = ctx.createGain();
let currentFrequ = 100;
oscillator.start(0);
res = []

function runTest(state) {
  //Connect oscillator.
  console.log("running test at ",currentFrequ, " hz")
  oscGain.connect(ctx.destination);
  oscGain.gain.value=0;
  oscillator.type = 'sine';
  oscillator.frequency.value = currentFrequ;
  oscillator.connect(oscGain);
  oscillator.connect(fft);
  let result = (oscGain.gain.value, currentFrequ);
  res.push(result);
  //Check next octave
  //if we reach the edge of the audible range
  if (currentFrequ > 20000) {
    state = 3;
  } else{
    currentFrequ = currentFrequ * 2
  }

}

//with volume slider adjust volume
volumeSlider.addEventListener('change', function () {
  console.log("volume changed")
  oscGain.gain.value = this.value;
});

startButton.addEventListener('click',buttonHandler);

//Run the test by handling the button
function buttonHandler(){
  console.log("button pressed");
  if (state == 1){
  startButton.innerHTML = "I can hear it";
  instructions.innerHTML = "Adjust the volume slider until you can barely hear the sound";
  runTest(state);
  state = state + 1;
  }
   

  else if (state == 2){
  startButton.innerHTML = "Next test";
  oscillator.disconnect();
  oscGain.disconnect();
  volumeSlider.value=0;
  instructions.innerHTML = "When you are ready go to the next test";
  state = state - 1;
  }

   //end of the test
   else if (state == 3) {
    console.log(res);
    startButton.innerHTML = "Finish test";
    instructions.innerHTML = "Find your results in the console";
  }

}


