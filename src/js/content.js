const VERSION = "0.0.1"
console.debug('Starting BCO Customizer Plugin... 🚀', VERSION)

const showTitle = () => {
  const title = document.getElementsByClassName("title")[0];
  const isHomepage = () => window.location.pathname == "/" || window.location.pathname.includes("/thread/list")

  chrome.storage.sync.get('title', (data) => {
    console.log('data', data)
    if (isHomepage()) {
      title.innerText = data.title
    }

    title.style.display = "block"
  })

}
console.log('jQuery', jQuery)
showTitle()
