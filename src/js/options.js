import "../css/options.css";
console.debug("🚀 BCO Options running... ")
const PROPS = ['title', 'banned']

const $$ = (s) => document.getElementById(s);
const update = () => {
  const title = $$("title")
  const banned = $$("banned")
  chrome.storage.sync.set({title: title.value, banned: banned.value})

  const text = "🚀  Settings updated.";
  const message = $$("message")
  message.style.display = "block";
  message.innerText = text;
};

chrome.storage.sync.get(PROPS, (data) => {
  const update = (prop) => {
    console.log('prop, data', prop, data)
    if(data[prop]) {
      $$(prop).value = data[prop]
    }
  }

  PROPS.forEach(update)
})

const button = document.getElementById("save");
button.addEventListener("click", update, false);
