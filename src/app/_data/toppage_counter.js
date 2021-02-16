var axios = require('axios')

// 訪問者数を取得
module.exports = async () => {

  params = {
    url: 'https://api.countapi.xyz/hit/ookam.github.io_yaminabe/visits',
    count: 0,
    countText: ''
  }

  await axios.get(params.url)
  .then((response) => {
    params.count = response.data.value
    // 訪問者数を8桁にゼロパディング
    params.countText = ('0000000' + params.count).slice(-8)
  })

  return params.countText
}
