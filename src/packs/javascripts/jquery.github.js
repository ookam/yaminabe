const axiosBase = require('axios')

// $('div').setGithubCommitCount() などで使える簡単な関数
$.fn.setGithubCommitCount = function(){
  params = {
    url: 'https://api.github.com/repos/ookam/yaminabe/git/refs/heads/main',
    first_commit_hash: '07da7612008968b34ee44c9b3deda1c0b843726d',
    last_commit_hash: '',
  }
  // ネストして書くのダサいけど、とりあえず……
  axiosBase.create().get(params.url).then((response) => {
    params.last_commit_hash = response.data.object.sha
    axiosBase.create().get(`https://api.github.com/repos/ookam/yaminabe/compare/${params.last_commit_hash}...${params.first_commit_hash}`).then((response) => {
      // behind = 間にx件あるのでそれに + 1 すればコミット数が取れる
      this.text(response.data.behind_by + 1)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
  .catch((error) => {
    console.error(error)
    reject(error)
  })
}
