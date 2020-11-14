
document.getElementById("login").onclick = function () {
  location.href = "instructions.html";
};










//old code; use for reference if necessary
const ctx = new (window.AudioContext || window.webkitAudioContext)()
const fft = new AnalyserNode(ctx, { fftSize: 2048 })
createWaveCanvas({ element: 'section', analyser: fft })
const startButton = document.getElementById('main_button');
const instructions = document.getElementById('instructions');
const volumeSlider = document.getElementById('volume');
let clickers = 0;
//Number of tests run
let numTests = 21;
let freqlist = [100, 200, 300, 500, 800, 1000, 1400, 1800, 2400, 3000, 3500, 4000, 5000, 7000, 9000, 12000, 16000, 18000]
//After which test we do the clicking.
let midway = 10;
let withWhiteNoise = false;

//Start the oscillator
//State defines the state of the test, button has different effect depending on state
let state = 0;
let oscillator = ctx.createOscillator();
let oscGain = ctx.createGain();
let currentFrequ = 100;
let whiteNoise = ctx.createBufferSource();
let whitGain = ctx.createGain();
let freq = 0;
oscillator.start(0);
res = []

//List of frequencies we want to check
// get the audio element
const audioElement = document.getElementById('audio');

// pass it into the audio context
const track = ctx.createMediaElementSource(audioElement);

function runTest() {
  //pick a random frequency out of frequency list
  freq =freqlist[Math.floor(Math.random() * freqlist.length)]
  console.log("running test at ", freq, " hz")
   //Connect oscillator.
  oscGain.connect(ctx.destination);
  oscGain.gain.value = 0;
  //only play this frequency
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(oscGain);
  oscillator.connect(fft);
}

function playWhiteNoise() {
  let bufferSize = 2 * ctx.sampleRate,
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
    output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  whiteNoise.start(0);
  whiteNoise.connect(ctx.destination);
  whiteNoise.connect(whitGain);
  whitGain.gain.value = 0.5;
  withWhiteNoise = true;

  
}


function displayResults(){
  let div = document.getElementById('results') 
  let html = "<table border='1|1'>";
  html +="<tr><td>Frequency (hz)</td><td>Loudness</td><td>White noise?</td></tr>"
    for (let i = 0; i < res.length; i++) {
      console.log(res[i]);
        html+="<tr>";
        html+="<td>"+res[i][1]+"</td>";
        html+="<td>"+res[i][0]+"</td>";
        html+="<td>"+res[i][2]+"</td>";
        html+="</tr>";
    }
    html+="</table>";
    startButton.style.display = "none";
    console.log(html);
    div.innerHTML = html;
}

//with volume slider adjust volume
volumeSlider.addEventListener('change', function () {
  console.log("volume changed")
  oscGain.gain.value = this.value;
});

startButton.addEventListener('click', buttonHandler);

//Run the test by handling the button
function buttonHandler() {
  console.log("button pressed ", state);
  if (clickers > numTests) {
    console.log(res);
    oscillator.disconnect();
    oscGain.disconnect();
    whiteNoise.disconnect();
    whitGain.disconnect();
    volumeSlider.value = 0;
    startButton.innerHTML = "Finish test";
    instructions.innerHTML = "Copy and paste the results from the table below into the textbox in the survey";
    displayResults();
  }
  else if (clickers == midway) {
    clickers++
    startButton.innerHTML = "With WhiteNoise";
    instructions.innerHTML = "White-noise will now be added to the test. To continue the test, press the \"WITH WHITENOISE\" button";
  }
  else if (clickers == midway + 1) {
    clickers++
    instructions.innerHTML = "Now raise your computer volume to a comfortable level, then press the \"Finished Adjustment\" button";
    startButton.innerHTML = "Finished Adjustment"
    playWhiteNoise();

  }
  else if (state == 0) {
    audioElement.play();
    startButton.innerHTML = "Finish Calibration";
    instructions.innerHTML = "Adjust the volume on your computer until you can barely hear the song"
    track.connect(ctx.destination);
    track.connect(oscGain).connect(ctx.destination);
    track.connect(fft);
    oscGain.gain.value = 0.2;
    state = 1;
  }

  else if (state == 1) {
    startButton.innerHTML = "Start Test";
    instructions.innerHTML = "Thank you for calibrating your audio. Press the \"START TEST\" button to begin the test."
    volumeSlider.hidden = true;
    track.disconnect();
    oscGain.disconnect();
    state = 2;
  }

  else if (state == 2) {
    startButton.innerHTML = "I can hear it";
    instructions.innerHTML = "Adjust the volume slider below (NOT YOUR DEVICE AUDIO) until you can barely hear the sound. If you cannot hear any sound, please slide the volume slider back to 0(Left), then press the \"I can hear\" button";
    volumeSlider.hidden = false;
    state = 3;
    runTest(state);
  }
  else if (state == 3) {
    clickers++;
    startButton.innerHTML = "Next test";
    oscillator.disconnect();
    oscGain.disconnect();
    let volume = parseFloat(volumeSlider.value);
    console.log(volume);
    let result = [volume, freq, withWhiteNoise];
    res.push(result);
    volumeSlider.value = 0;
    volumeSlider.hidden = true;
    instructions.innerHTML = "When you are ready, press the \"Next Test\" button";
    state = 2;
  }
}
