const selectedOptions = document.getElementById("audio-source");

document.getElementById("info").addEventListener("click", async () => {
  await Tone.start();
  document.querySelector("h4").innerText = "Permission Granted";
  console.log("audio is ready");
});

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
      console.log("No value selected");
      break;
  }
});

function monoAudio() {
  console.log("Mono");
  let monoOutput = new Tone.Mono();
}

function stereoAudio() {
  console.log("Stereo");
}

function midiAudio() {
  console.log("Midi");
}
