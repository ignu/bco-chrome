const VERSION = "0.0.3"
console.log('Starting BCO Customizer Plugin... 🚀', VERSION)

let bannedWords = []

// hack contains to make case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

const removeBannedWords = function() {
  console.log('bannedWords', bannedWords)
  bannedWords.forEach(function(word) {
    console.log('word', word)
    $("ul.view:contains(" + word + ")").hide()
  })
}

// when clicking view more. don't know why $(document).ajaxComplete didn't work.
$(function() {
  $("#uncollapse_some, #uncollapse_all, ul.bottom li a").click(function() {
    [10, 50, 100, 150, 300, 800, 1500, 3000].forEach(function(i) {
      setTimeout(removeBannedWords, i)
    })
  })
})

const showTitle = () => {
  const title = document.getElementsByClassName("title")[0];
  const isHomepage = () => window.location.pathname == "/" || window.location.pathname.includes("/thread/list")

  chrome.storage.sync.get(['title', 'banned'], (data) => {
    if (isHomepage()) {
      if(data && data.title) {
        title.innerText = data.title
      }
    }

      if (data && data.banned) {
        bannedWords = data.banned.split(",")
        $(removeBannedWords)
      }

    title.style.opacity = 1
  })
}
showTitle()

const userNameRegex = /@([a-zA-Z0-9]+)/g;



const linkHashtags = () => {
  function replaceHashtags(text) {
    return text.replace(
        userNameRegex,
        '<a class="username" href="http://twitter.com/$1">@$1</a>'
    );
  }

  $(document).ready(function(){
    $('li').each(function() {
       $(this).html(replaceHashtags($(this).html()));
    });
  });
}

setTimeout(linkHashtags, 1000)
