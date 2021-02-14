const stylesheets = require.context('.', true, /.+\.(js|ts)$/)
stylesheets.keys().forEach(stylesheets)
