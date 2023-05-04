const selectedOptions = document.getElementById("audio-source");

selectedOptions.addEventListener("change", (event) => {
  const selectedOptionValue = event.target.value;

  switch (selectedOptionValue) {
    case "mono":
      console.log("Mono");
      break;
    case "stereo":
      console.log("Stereo");
      break;
    case "midi":
      console.log("Midi");
      break;
    default:
      console.log("No value selected");
      break;
  }
});
