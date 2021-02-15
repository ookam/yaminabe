# なにこれ？
このリポジトリに貢献する際に必要な情報をまとめたドキュメントです。

# 前提
## 誰向け？
以下の人を対象に書いています。

* CLIを使ったことがある
* gitを触ったことがあって、git addやgit commitのようなコマンドを使ったことがある
* gitやyarnなどのツールをググってインストールできる

nodejsやnpm、yarnの知識は仮定しません。

# Pull Request
## 準備
本ドキュメントに沿ってPull Requestを送るために必要なツールは下記です。
* git
* yarn

## 本プロジェクトにPull Requestを送る方法
1. ProjectをForkする

    `https://github.com/ookam/yaminabe`にアクセスして右上の[Fork]をクリックしましょう。

2. ForkしたProjectを自分のコンピュータにCloneする
    ```
    git clone https://github.com/<あなたのGitHubのユーザ名>/yaminabe.git
    ```

3. ブランチを切る
    ```
    cd yaminabe
    git checkout -b <ブランチ名>
    ```

4. ファイルを編集する

5. 動作確認をする

    以下のコマンドで動作確認できます。
    ```
    yarn install
    yarn start
    ```

6. 編集内容を確認する

    ```
    git diff
    ```

7. commitとpushをする
    ```
    git add <編集したファイル>
    git diff --cached
    git commit
    git push
    ```

8. Pull Requestを送る

    `https://github.com/<あなたのGitHubのユーザ名>/yaminabe/tree/<ブランチ名>`にアクセスし、[Pull request]をクリックしよう！

# 最後に
これを読んだ人は、もっと初めて貢献する人に優しくなるように本ドキュメントを変更するPull Requestをしてみよう！
