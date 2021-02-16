// ダークモード判定用変数
var isDarkmode

// 起動時にダークモードを確認＆セットする
$(function(){
  // クッキーにダークモードが指定されているか、ユーザーのデバイスがダークモードの時ダークモードを利用
  isDarkmode = (window.isCookieDarkmode() || window.isDeviceDarkmode())

  // isDarkModeの時、<html>にdark-modeを追加
  window.changeDarkMode(false)
})

// ダークモードのトグル処理
window.toggleDarkMode = function(){
  // ダークモードのトグル処理
  isDarkmode = isDarkmode ? false : true
  window.changeDarkMode()
}

// isDarkModeの時、<html>にdark-modeを追加
window.changeDarkMode = function(isSetCookie=true){
  if(isDarkmode){
    $('html').addClass('dark')
    $('#js-darkmode-text').addClass('text-gray-200').removeClass('text-gray-600').text('䦣')
  }else{
    $('html').removeClass('dark')
    $('#js-darkmode-text').addClass('text-gray-600').removeClass('text-gray-200').text('灮')
  }
  // クッキーにセット
  if(isSetCookie){
    window.setCookieDarkmode(isDarkmode)
  }
}

// ユーザーのデバイスがダークモードかどうかを確認
window.isDeviceDarkmode = function(){
  return !!getComputedStyle(document.querySelector("html")).getPropertyValue('--isDarkmode');
}

// ユーザーのcookieがダークモードかどうかを確認
window.isCookieDarkmode = function(){
  return Cookies.get('isDarkmode', { path: '/' }) == 'true'
}

// ユーザーのcookieがダークモードかどうかを確認
window.setCookieDarkmode = function(value){
  Cookies.set('isDarkmode', `${value}`, { expires: 2000, path: '/' })
}
