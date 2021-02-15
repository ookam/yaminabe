// 起動時にダークモードを確認＆セットする
$(function(){
  // クッキーにダークモードが指定されているか、ユーザーのデバイスがダークモードの時ダークモードを利用
  var isDarkmode = (window.isCookieDarkmode() || window.isDeviceDarkmode())

  // isDarkModeの時、<html>にdark-modeを追加
  window.changeDarkMode(isDarkmode)
})

// isDarkModeの時、<html>にdark-modeを追加
window.changeDarkMode = function(isDarkmode){
  if(isDarkmode){
    $('html').addClass('dark')
  }else{
    $('html').removeClass('dark')
  }
  // クッキーにセット
  window.setCookieDarkmode(isDarkmode)
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
