import "../css/options.css";
console.debug("🚀 BCO Options running... ")

const update = () => {
  const text = "🚀  Settings updated.";
  const message = document.getElementById("message");
  message.style.display = "block";
  message.innerText = text;
  console.info(text);
};

const button = document.getElementById("save");
button.addEventListener("click", update, false);
