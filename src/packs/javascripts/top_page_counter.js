var axios = require('axios')

// 訪問者数を取得
$.fn.set_top_page_counter = function(){
  var params = {
    url: 'https://api.countapi.xyz/hit/ookam.github.io_yaminabe/visits',
  }

  axios
    .get(params.url)
    .then((response) => {
      this.text(('0000000' + response.data.value).slice(-8))
    })
}
