var axios = require('axios')

module.exports = async () => {
  try {
    const response = await axios
      .get(
        "https://api.github.com/repos/ookam/yaminabe/contributors",
        {
          timeout : 10000,
        }
      )
    const contributors = []
    response.data.map((contributor) => {
      contributors.push({
        icon: contributor.avatar_url,
        name: contributor.login,
        url: contributor.html_url,
        count: contributor.contributions,
      })
    })
    return contributors
  }catch(error){
    if (process.env.ELEVENTY_ENV === "production") {
      console.error("contributorsの取得に失敗しました。レート制限に引っかかっている可能性があります。")
      // productionではビルドを失敗させる
      return Promise.reject(error)
    } else {
      // production以外で取得に失敗した場合はダミーのデータを返す
      return [{
        icon: `https://1.bp.blogspot.com/-WtFMJ6-1dj8/Wn1aLwFok7I/AAAAAAABKSw/m1EvZlo6XiQ3Zwx1oTdBv9KP598RAFGhwCLcBGAs/s400/pose_kuyashii_man.png`,
        name: `取得に失敗しました`,
        url: `https://ookam.github.io/yaminabe/`,
        count: 0,
      }]
    }
  }
}
