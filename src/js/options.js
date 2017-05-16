import "../css/options.css";
console.debug("🚀 BCO Options running... ")

const $$ = (s) => document.getElementById(s);
const update = () => {
  const input = $$("title")
  console.log('input', input)
  chrome.storage.sync.set({title: input.value})

  const text = "🚀  Settings updated.";
  const message = $$("message")
  message.style.display = "block";
  message.innerText = text;
  console.debug(text)
};

chrome.storage.sync.get('title', (data) => {
  $$("title").value = data.title
})

const button = document.getElementById("save");
button.addEventListener("click", update, false);
