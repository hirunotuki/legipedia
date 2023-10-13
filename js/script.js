//load typekit
(function (d) {
  var config = {
    kitId: 'hsd0uya',
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
})(document);


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
      var arrCodeLang = $('.btn-lang.selected').attr('code-lang').split(' ');
      for (var i = 0; i < arrCodeLang.length; i++) {
        $.ajax({
          type: 'get',
          url: '_' + arrCodeLang[i] + '.html',
          dataType:'html'
        }).done((data) => {
          $('.base-container').append(data);
        })
      }
    }
  })
}
$(() => {
  lang_selected();
})

// $('.btn-lang').on('click', function () {
// console.log('clicked');
//   if ($(this).hasClass('selected')) { }
//   else {
// $('button.btn-lang.selected').removeClass('selected');
// $(this).addClass('selected');
// }
// })
// $('.btn-lang').click

// $(window).on('load', function () {
//   lang_container_load()
// })
// $('.btn-lang').on('click', event => {
//   console.log('clicked');
// })
// $('.btn-lang').click(function () {
// console.log('clicked')
// })
// $('.btn-lang').addClass('selected')

//align each element in bi-lang-container 
function alignment() {
  var secs = $('div.code-area:lang(ja) *[id^="ja-sec"]').length;
  console.log(secs);
  for (let i = secs; i >= 1; i--) {
    var heightJ = $('div.code-area:lang(ja) *#ja-sec' + i).height();
    var heightE = $('div.code-area:lang(en) *#en-sec' + i).height();
    var heightFx = Math.max(heightJ, heightE);
    $('div.code-area *[id$="sec' + i + '"]').css('height', heightFx + 'px');
  }
}
$(window).on('load', () => {
  alignment()
  // $('.btn-lang').on('click', event => {
  //   console.log('clicked');
  //   $(event.currentTarget).addClass('selected')
  // })
})
$(window).on('resize', () => {
  $('div.code-area *[id*="sec"]').css('height', '');
  alignment()
})