# Hobeeeeee!!

## エレベータピッチ

**Hobeeeeee!!** は  
**新しい趣味を見つけたい・広めたい** という人の願望を叶える  
**Web サービス** です。これは  
**好きそうな趣味をつながりから探せること** によって、  
**note** とは違って  
**サークルの新歓のように趣味を見つける・広めること** を実現できます。

## リリースノート

### v2.0.0

#### <記事投稿関連>

- 記事投稿時にタグを追加できるようになりました。
- 記事投稿時のタグがサジェストされるようになりました。
- 記事投稿時にタグを新規作成できるようになりました。
- ずぶずぶボタンの実装により投稿者にフィードバックが行くようになりました。
- 記事投稿時に書いた人のユーザ名を登録できるようになりました。
- 記事投稿後に自動で記事に遷移されます。
- Twitterでシェアボタンを追加し、Hobeeeeee!!への誘導・シェアによる投稿者のモチベーションを高めました。

####  <趣味探し関連>

- ノードの大きさが記事数に応じて変更されるようになりました。
- ノードが同心円上に表示されることで見やすくなりました。
- グラフが拡大・移動できるようになりました。
- グラフにランダムノードが表示されるようになりました。これにより知らない趣味を知ることができるようになりました。
- グラフのラインの太さが関連性に基づいたものになりました。線の太さが一定の範囲に収まり、見やすくなりました。
- 記事表示がマークダウンになりました。
- 記事表示画面にタグが表示されるようになりました。
- 本サービスを使えば使うほど、関連する趣味同士のつながりが強くなるようになりました。

####  <その他>

- ナビゲーションバーにより使い勝手が向上しました。

### v1.0.0

- 記事編集画面が使用できます（Markdown対応）
- 登録済みの趣味同士の関連を辿って趣味を探せます

## 公開先

[hobeeeeee](https://hobeeeeee.netlify.app/)

## メンバー

- [katsuya](https://github.com/KindMaple)
- [basshi](https://github.com/Kurorie)
- [mei](https://github.com/mei28)
- [niwa](https://github.com/niwabarubossa)
- [nanaka](https://github.com/nanaka0012)
- [hotsukai](https://github.com/Hotsukai)

## セットアップ

```bash
# パッケージインストール
$ yarn install
or
$ npm install
# localhost:3000でローカルサーバ立ち上げ
$ yarn dev
or
$ npm run dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
