var axios  = require('axios');

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios
    .get(
      "https://api.github.com/repos/ookam/yaminabe/contributors",
      {
        timeout : 10000,
      }
    )
    .then((response) => {
      const data = []
      response.data.map((contributor) => {
        data.push({
          icon: contributor.avatar_url,
          name: contributor.login,
          url: contributor.html_url,
          count: contributor.contributions,
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
