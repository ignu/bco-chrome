const VERSION = "0.0.7";
console.log("Starting BCO Customizer Plugin... 🚀", VERSION);

let bannedWords = [];

// hack contains to make case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function(elem) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

const removeBannedWords = function() {
  bannedWords.forEach(function(word) {
    $("ul.view:contains(" + word + ")").hide();
  });
};

const updateTrumpDate = function() {
  const trumpy = $('h3:contains("1360 More Days"), a:contains("1360 More Days")')

  if(!trumpy.length) return

  let title = trumpy.text()

  const jan2021 = new Date(2021, 0, 20)

  const daysLeft = Math.round((jan2021-(new Date()))/(1000*60*60*24));

  trumpy.text(title.replace('1360', daysLeft))
}
$(updateTrumpDate)

const showTitle = () => {
  const title = document.getElementsByClassName("title")[0];
  const isHomepage = () =>
    window.location.pathname == "/" ||
    window.location.pathname.includes("/thread/list");

  chrome.storage.sync.get(["title", "banned"], data => {
    if (isHomepage()) {
      if (data && data.title) {
        title.innerText = data.title;
      }
    }

    if (data && data.banned) {
      bannedWords = data.banned.split(",");
      $(removeBannedWords);
    }

    title.style.opacity = 1;
  });
};

showTitle();

showColumnsOnSearch = () => {
  const isSearch = window.location.pathname.includes("search");

  if(isSearch) {
    $(".subject").css({width: "47%"})
    $(".lastpost").show()
  }
}
$(showColumnsOnSearch)

const userNameRegex = /(\s|^)@([a-zA-Z0-9]+)/g;

const linkHashtags = () => {
  function replaceHashtags(text) {
    return text.replace(
      userNameRegex,
      '$1<a class="username" href="http://twitter.com/$2">@$2</a>'
    );
  }

  $(document).ready(function() {
    $("li").each(function() {
      $(this).html(replaceHashtags($(this).html()));
    });
  });
};

setTimeout(linkHashtags, 1000);

// when clicking view more. don't know why $(document).ajaxComplete didn't work.
$(function() {
  $("#uncollapse_some, #uncollapse_all, ul.bottom li a").click(function() {
    [10, 50, 100, 150, 300, 800, 1500, 3000].forEach(function(i) {
      setTimeout(removeBannedWords, i);
      setTimeout(linkHashtags, i);
    });
  });
});
