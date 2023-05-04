const selectedOptions = document.getElementById("audio-source");

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
  
}

function stereoAudio() {
  console.log("Stereo");
}

function midiAudio() {
  console.log("Midi");
}
