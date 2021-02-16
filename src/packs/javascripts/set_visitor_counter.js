// 起動時にajaxで訪問者数を取得＆セットする
$(function(){
  $.ajax(
    'https://api.countapi.xyz/hit/ookam.github.io_yaminabe/visits',
    {
      dataType: 'json',
      timeout: 10000,
      success: function(data, status, xhr){
        var count = data.value
        // 訪問者数を8桁にゼロパディング
        var countText = ('0000000' + count).slice(-8)
        // js-visitor-countにセットして終わり
        $('#js-visitor-count').text(countText)
      }
    }
  )
})