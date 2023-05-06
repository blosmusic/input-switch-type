const selectedOptions = document.getElementById("audio-source");

let midiInput;
const synth = new Tone.PolySynth().toDestination();
const now = Tone.now();

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
  closeMidiInput();
  startAudio();
  const monoOutput = new Tone.Mono();
  mic.connect(monoOutput);
  monoOutput.toDestination();
  // console.log(monoOutput);
}

function stereoAudio() {
  console.log("Stereo");
  closeMidiInput();
  startAudio();
  const monoLeft = new Tone.Mono({ channelCount: 1 });
  const monoRight = new Tone.Mono({ channelCount: -1 });
  mic.connect(monoLeft, monoRight);
  monoLeft.toDestination();
  monoRight.toDestination();
}

function midiAudio() {
  console.log("Midi");
  mic.close();

  const midi = new Tone.Midi();

  // Enable the MIDI connection
  navigator
    .requestMIDIAccess()
    .then((access) => {
      const inputs = access.inputs.values();
      for (let input of inputs) {
        if (input.name === "iRig KEYS 25") {
          midiInput = input;
          midiInput.onmidimessage = (message) => {
            const command = message.data[0] & 0xf0;
            const note = message.data[1];
            const velocity = message.data[2];

            if (command === 144) {
              // Note On event
              console.log("Note On:", note, velocity);
              // Trigger Tone.js sound or perform other actions based on the received note
              synth.triggerAttack(Tone.Frequency(note, 'midi'), now, velocity / 127);
            } else if (command === 128) {
              // Note Off event
              console.log("Note Off:", note, velocity);
              // Handle the note off event if needed
              synth.triggerRelease(Tone.Frequency(note, "midi"));
            }
          };
        } else {
          input.onmidimessage = null; // Remove the event listener
        }
      }
    })
    .catch((error) => {
      console.log("MIDI connection error:", error);
    });
}

function closeMidiInput() {
  // Check if the MIDI input is available
  if (midiInput) {
    // Clear the MIDI input event handler
    midiInput.onmidimessage = null;
    // Close the MIDI input
    midiInput
      .close()
      .then(() => {
        console.log("MIDI input closed");
      })
      .catch((error) => {
        console.error("Failed to close MIDI input:", error);
      });
  }
}
