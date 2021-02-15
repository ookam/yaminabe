function generateUuid() {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
          case "x":
              chars[i] = Math.floor(Math.random() * 16).toString(16);
              break;
          case "y":
              chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
              break;
      }
  }
  return chars.join("");
}

function generateColors( one_cycle_length, index, initial_radian=0){

  var one_step = 360 / one_cycle_length; // 360度を1サイクルで割って、1サイクル毎に何度進めるかを取得する
  var radian = initial_radian + ( one_step * index ) // 初期設定の角度 + index * 一度に進む角度で、現在の角度を求める
  radian = radian % 360                              // 360度を超えていないかチェックして超えていたら2週目に入る

  // 色がその角度の中でどれくらい進んでいるか？
  one_radian = radian % 60 / 60

  // 0 ~ 60度の間は 255 , 0 → 250, 0 の間で変化する
  if( radian < 60 ){
    return `rgb(255, ${one_radian * 255}, 0)`;
  }
  // 61 ~ 120度の間は 255 → 0 , 255, 0 の間で変化する
  if( radian < 120 ){
    return `rgb(${255 - (one_radian * 255)}, 255, 0)`;
  }
  // 121 ~ 180度の間は 0, 255, 0 → 255 の間で変化する
  if( radian < 180 ){
    return `rgb(0, 255, ${one_radian * 255})`;
  }
  // 181 ~ 240度の間は 0, 255 → 0, 255 の間で変化する
  if( radian < 240 ){
    return `rgb(0, ${255 - (one_radian * 255)}, 255)`;
  }
  // 241 ~ 300度の間は 0 → 255, 0, 255 の間で変化する
  if( radian < 300 ){
    return `rgb(${one_radian * 255}, 0, 255)`;
  }
  // 301 ~ 360度の間は 255, 0, 255 → 0 の間で変化する
  return `rgb(255, 0, ${255 - (one_radian * 255)})`;
}


// $('div').rainbow() などで使える簡単な関数
$.fn.rainbow = function() {
  params = {
    one_cycle_length: 16,                   // 何文字で1サイクルとするか(1文字目が赤から始まり、{one_cycle_length}文字目に赤に戻る)
    glow:             2,                    // 発光 pxで指定
    animation_speed:  70,                   // アニメーション速度
    object:           this,                 // 自分自身のjqueryオブジェクト
    text:             $.trim(this.text()),  // アニメーションするテキスト
    uuid:             generateUuid(),       // uuidを発行してアニメーションする
  }

  var words = []
  const COLORS = new Array(params.one_cycle_length);

  // Setting color.
  for( var i=0; i < params.one_cycle_length; i++ ){
    COLORS[i] = generateColors(params.one_cycle_length, i);
  }

  params.text.split('').forEach(function(v, i) {
    var color = COLORS[i % params.one_cycle_length];
    words.push(
      $('<span></span>').attr('id', `${params.uuid}-${i}`).text(v).css('color', color)
    )
  });

  // 文字の配色がone_cycle_lengthを超えたら0に戻すことで∞レインボーカラーを実現
  var counter = 0;

  // アニメーションを開始する
  setInterval(function(){
    words.forEach(function(v, i) {
      var color = COLORS[(i + counter) % params.one_cycle_length];
      v.css('color', color);
      if(params.glow > 0){
        v.css('text-shadow', `0 0 ${params.glow}px ${color}`);
      }
    })
    counter = (counter + 1) % params.one_cycle_length;
  }, params.animation_speed );

  this.html(words)

  return this
};
