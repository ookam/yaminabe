require('./tailwind.scss')

const stylesheets = require.context('.', true, /.+\.(css|scss)$/)
stylesheets.keys().forEach(stylesheets)
