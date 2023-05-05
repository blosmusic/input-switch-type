const selectedOptions = document.getElementById("audio-source");

document.getElementById("info").addEventListener("click", async () => {
  await Tone.start();
  document.querySelector("h4").innerText = "Permission Granted";
  console.log("audio is ready");
});

const meter = new Tone.Meter();
let inputLevelValueRead = null;

const mic = new Tone.UserMedia().chain(meter);

function startAudio() {
  mic
    .open()
    .then(() => {
      console.log("Mic is open");
      processAudioInputLevel();
      // mic.start();
    })
    .catch((e) => {
      console.log("Mic is not open");
      console.log(e);
    });
}

selectedOptions.addEventListener("change", (event) => {
  const selectedOptionValue = event.target.value;

  switch (selectedOptionValue) {
    case "mono":
      monoAudio();
      break;
    case "stereo":
      stereoAudio();
      break;
    case "midi":
      midiAudio();
      break;
    default:
      mic.close();
      console.log("No value selected");
      break;
  }
});

function monoAudio() {
  console.log("Mono");
  startAudio();
  const monoOutput = new Tone.Mono();
}

function stereoAudio() {
  console.log("Stereo");
  startAudio();
  const monoLeft = new Tone.Mono({ channelCount: 1 });
  const monoRight = new Tone.Mono({ channelCount: -1 });
}

function midiAudio() {
  console.log("Midi");
  startAudio();
}

// read input level - check if mic is open
function processAudioInputLevel() {
  console.log("processAudioInputLevel called");
  inputLevelValueRead = meter.getValue().toFixed(2);
  // print the incoming mic levels in decibels
  console.log("The Decibel level is:", inputLevelValueRead, "dB");
}