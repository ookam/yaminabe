const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const Nunjucks = require("nunjucks");

const webpackAsset = async name => {
  const manifestData = await readFile(
    path.resolve(__dirname, "dist", "packs", "manifest.json")
  );
  const manifest = JSON.parse(manifestData);

  // もしもnameに該当するファイルが存在しなかった場合
  // 指定ミスの可能性が高いのでエラーを投げる
  if(manifest[name] === undefined){
    console.log('------------')
    console.log(name + 'という名前のファイルは/dist/packs/manifest.jsonに存在しません')
    console.log('指定が間違ってないか確認して下さい（拡張子を付け忘れていませんか？）')
    console.log('指定できるのは↓のみです')
    console.log(manifest)
    console.log('------------')
    throw '';
  }
  return manifest[name];
};

const webpackAssetContents = async name => {
  const assetName = await webpackAsset(name);
  const filePath = path.resolve(__dirname, "dist", "packs", assetName);

  return readFile(filePath);
};

module.exports = (eleventyConfig) => {
  // njkを読み込む
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      'src/app/_includes',
    ], {
      noCache: true,
      watch: true,
    })
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  eleventyConfig.addNunjucksAsyncShortcode('webpackAsset', webpackAsset);
  eleventyConfig.addNunjucksAsyncShortcode('webpackAssetContents', webpackAssetContents);

  // publicに置いたファイルを /distにコピーする
  eleventyConfig.addPassthroughCopy({ "src/public/": "/" });

  // webpackの設定を追加
  eleventyConfig.addLiquidShortcode(
    "webpackAsset",
    webpackAsset
  );
  eleventyConfig.addLiquidShortcode(
    "webpackAssetContents",
    webpackAssetContents
  );

  return {
    pathPrefix: `/${path.basename(process.env.npm_package_repository_url, '.git')}`,
    // 出力先のディレクトリ
    dir: {
      // メインで開発していくディレクトリ
      input: "src/app/views",
      // 出力先のディレクトリ
      output: "dist",
      // パーツを設置するディレクトリ
      includes: "../_includes",
      // データを設置するディレクトリ
      data: "../_data"
    },
    // 利用するフォーマット
    templateFormats: [
      "html",
      // "liquid",
      // "ejs",
      // "md",
      // "hbs",
      // "mustache",
      // "haml",
      // "pug",
      "njk",
      // "11ty.js",
    ],
  };
};
