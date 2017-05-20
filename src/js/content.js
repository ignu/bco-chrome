const VERSION = "0.0.2"
console.log('Starting BCO Customizer Plugin... 🚀', VERSION)

const showTitle = () => {
  const title = document.getElementsByClassName("title")[0];
  const isHomepage = () => window.location.pathname == "/" || window.location.pathname.includes("/thread/list")

  chrome.storage.sync.get('title', (data) => {
    console.log('data', data)
    if (isHomepage()) {
      if(data && data.title) {
        title.innerText = data.title
      }
    }

    title.style.opacity = 1
  })

}
showTitle()

const userNameRegex = /@([a-zA-Z0-9]+)/g;

function linkHashtags(text) {
  console.log('text', text)
    return text.replace(
        userNameRegex,
        '<a class="username" href="http://twitter.com/$1">@$1</a>'
    );
}

const x = () => {
  console.log('document', document)
  $(document).ready(function(){
    $('li').each(function() {
       $(this).html(linkHashtags($(this).html()));
    });
  });
}

setTimeout(x, 1000)
