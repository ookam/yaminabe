var axios  = require('axios');

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://api.github.com/repos/ookam/yaminabe/stats/contributors")
      .then((response) => {
        const data = []
        response.data.map((contributor) => {
          data.push({
            icon: contributor.author.avatar_url,
            name: contributor.author.login,
            url: contributor.author.html_url,
            count: contributor.total,
          })
        })
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
}
