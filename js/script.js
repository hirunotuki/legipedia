//load typekit
(function (d) {
  var config = {
    kitId: 'hsd0uya',
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
})(document);

//loading view
$(() => {
  $(window).on('load', () => {
      $('.loader').delay(600).fadeout(600);
      $('.loader-container').delay(900).fadeOut(800);
  })
  setTimeout(() => {
      $('.loader-container').fadeOut(600);
  }, 5000);
})

//load header
$(() => {
  $('header.article').load('https://kanwakyudai.github.io/legipedia/parts/header/article.html')
})


//select lang type
function lang_selected() {
  $('.btn-lang').on('click', event => {
    console.log('clicked');
    if (!$(event.currentTarget).hasClass('selected')) {
      $('.btn-lang.selected').removeClass('selected');
      $(event.currentTarget).addClass('selected');
      $('div.outer-container>div').remove();
      var langNum = $('.btn-lang.selected').attr('container');
      $('div.outer-container').append('<div id="base-container" class="' + langNum + '">');
      var arrCodeLang = []
      var arrCodeLang = $('.btn-lang.selected').attr('code-lang').split(' ');
      for (var i = 0; i < arrCodeLang.length; i++) {
        $.ajax({
          type: 'get',
          url: './' + arrCodeLang[i] + '.html',
          dataType: 'html'
        }).done((data) => {
          $('#base-container').append(data);
        })
      }
      alignment()
    }
  })
}
$(() => {
  lang_selected();
})

//align each element in bi-lang-container 
function alignment() {
  var secs = $('.bi-lang>.code-area:lang(ja) *[id^="ja-sec"]').length;
  console.log(secs);
  for (let i = secs; i >= 1; i--) {
    var heightJ = $('.bi-lang>.code-area:lang(ja) *#ja-sec' + i).height();
    var heightE = $('.bi-lang>.code-area:lang(en) *#en-sec' + i).height();
    var heightFx = Math.max(heightJ, heightE);
    $('.bi-lang>.code-area *[id$="sec' + i + '"]').css('height', heightFx + 'px');
  }
}
$(window).on('load', () => {
  alignment()
})
$(window).on('resize', () => {
  $('.bi-lang>div.code-area *[id*="sec"]').css('height', '');
  alignment()
})