console.debug("🚀 BCO Options running... ")
console.log('hi')
setTimeout(function() {
  console.log('1', 1)
}, 40)

setTimeout(function() {
  console.log('1', 1)
}, 1940)
chrome.extension.onRequest.addListener(function(request, sender, callback) {
  console.log('chrome.extension', chrome.extension)
  console.log('request, sender', request, sender)
});

const addFromContextMenu = () => {
  const title = document.getElementsByClassName("title")[0];
  console.log('title', title)
  title.innerText = "HELLO"
}

chrome.contextMenus.create({
  "title": "COOL 🚀",
  "onclick": addFromContextMenu
});
