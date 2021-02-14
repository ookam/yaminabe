// デフォルトのtailwind.config.js
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: [
      './app/**/**/*.*',
    ]
  },
  darkMode: false, // or 'media' or 'class',
  theme: {
    screens: {
      tab_pc: '768px',
      pc: '1025px',
    },
  },
  variants: {
    extend: {
      cursor:  ['disabled'],
      opacity: ['disabled'],
      outline: ['hover', 'focus', 'active'],
    }
  },
  plugins: [
    plugin(function({ addUtilities }){
      const newUtilities = {
        '.bg-blur': {
          backdropFilter: 'blur(4px)'
        },
        '.overflow-smoothing': {
          '-webkit-overflow-scrolling': 'touch'
        },
        '.tap-highlight-off': {
          '-webkit-tap-highlight-color': 'transparent'
        },
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)'
        },
        '.safe-left': {
          paddingLeft: 'constant(safe-area-inset-left)',
          paddingLeft: 'env(safe-area-inset-left)'
        },
        '.safe-right': {
          paddingRight: 'constant(safe-area-inset-right)',
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-bottom': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        },
        '.cut': {
          display: '-webkit-box',
          overflow: 'hidden',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          wordBreak: 'break-all',
        },
        '.cut-2': {
          display: '-webkit-box',
          overflow: 'hidden',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          wordBreak: 'break-all'
        },
      }

      addUtilities( newUtilities );
    })
  ],
}
