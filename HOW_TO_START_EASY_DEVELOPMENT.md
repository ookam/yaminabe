# これはなに？

yaminabeのコード書いてみようかな？と思った方に、最初に目を通してほしいドキュメントです。

## 前提

- CLIの操作ができる。
- html, css, javascriptの基礎知識。
- node, npm, yarnなどのコマンドの理解。
- git, GitHubの基本的な操作。

## 起動までの手順

ターミナルで以下のコマンドを実行。

```
$ mkdir 作業フォルダ
$ git clone https://github.com/ookam/yaminabe.git
$ cd ./yaminabe
$ yarn install
$ yarn start
```

$ yarn startを実行するとローカルサーバ(http://localhost:8080)が起動。

## テキストエディッタ

- [VSCode](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)

  yaminabeのGitHubのソースには、VSCodeでの開発に必要な設定ファイルとおすすめの拡張機能が同梱されています。
  オススメ。

## 主な使用フレームワークと簡単な解説

- [static_homepage](https://github.com/ookam/static_homepage)

  yaminabeの基盤。@ookam謹製の静的HP生成パック。
  後述の11ty,tailwindやscssなどの開発に必要なライブラリをいい感じにパッキングしてくれている。

- [11ty](https://www.11ty.dev/docs/)

  静的サイトジェネレーターの1つ。JSテンプレートエンジンもscssもついてないシンプルな子。

- [Nunjucks](https://mozilla.github.io/nunjucks/)

  JSのテンプレートエンジンの1つ。ファイル拡張子は、.njk。テンプレートエンジンを使用することでパーツの共通化や変数の代入 `{{ hogehoge }}`、繰り返しなどが可能になる。

- [tailwind](https://tailwindcss.com/)

  CSSフレームワークの1つ。マージンとかフォントサイズなど、よく使われるスタイルがあらかじめクラスとして登録されている。自分で独自クラスを定義する前に一度[tailwind 公式ドキュメント](https://tailwindcss.com/docs/installation)を確認してみるとよい。

  下記は、tailwindの実際の使用例。

  ```
  {# ダークモードの切り替えボタン #}
  <div class='absolute z-10 flex items-center cursor-pointer text-s top-2 bottom-2 right-3 tap-highlight-off'>
    <div class='px-1' onclick='window.toggleDarkMode()'>
      <span id="js-darkmode-text">灮</span>
    </div>
  </div>
  ```

## 【目的別】ファイルの格納場所

- HTMLページを追加、編集したい

  /src/app/views/\*.njk

- HTMLに共通するレイアウトやパーツを定義したい

  - レイアウト

    /src/app/\_includes/layouts/\_.njk

  - コンポーネント

    /src/app/\_includes/components/\_.njk

- JavaScriptを追加・編集したい

  - 通常

    /src/packs/javascript/\*.js

  - グローバルオブジェクト

    ここに格納されたファイルは、テンプレートから変数として参照可能。詳しくは、[11ty doc](https://www.11ty.dev/docs/config/#directory-for-global-data-files)参照。

    /src/app/\_data/\*.js

- スタイルを追加・変更したい

  /src/packs/stylesheets/\*.scss

- 画像を追加したい

  /src/public/images/\*

- それ以外のファイル、フォルダー構成の詳細は、下記参照。

  https://github.com/ookam/static_homepage

## Pull Request

- Pull Requestの手順は、下記参照。

  https://github.com/ookam/yaminabe/blob/main/CONTRIBUTING.md

## 最後に

これを読んだ人は、もっとはじめて貢献する人に優しくなるように本ドキュメントを変更する`Pull Request`をしてみよう！
ドキュメントの`Pull Request`の手順は[こちら](EASIEST_CONTRIBUTING)。
