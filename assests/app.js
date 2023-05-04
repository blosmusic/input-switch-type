const selectedOptions = document.getElementById("audio-source");

selectedOptions.addEventListener("change", (event) => {
const selectedOptionValue = event.target.value;
console.log("Value Selected:", selectedOptionValue);
});