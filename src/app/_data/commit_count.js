var axios  = require('axios');

module.exports = async () => {
  params = {
    url: 'https://api.github.com/repos/ookam/yaminabe/git/refs/heads/main',
    first_commit_hash: '07da7612008968b34ee44c9b3deda1c0b843726d',
    latest_commit_hash: '',
    commit_count: 0
  }
  try{
    await axios.get(params.url)
    .then((response) => {
      params.latest_commit_hash = response.data.object.sha
    })
    await axios.get(`https://api.github.com/repos/ookam/yaminabe/compare/${params.latest_commit_hash}...${params.first_commit_hash}`)
    .then((response) => {
      // behind = 間にx件あるのでそれに + 1 すればコミット数が取れる
      params.commit_count = response.data.behind_by + 1
    })
  }catch{
    return 'loading error....'
  }
  return params.commit_count
}
