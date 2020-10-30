## ルーティング（ディレクトリ構成）

`_`で始まるのは変数。
```
/ -> 「探す」or「書く」 /index.vue
/_hobbyId/_articleId -> 記事 /_hobbyId/_articleId.vue
/_hobbyId/list -> 趣味の記事一覧 /_hobbyId/list.vue
/_hobbyId/graph -> 趣味中心のグラフ /_hobbyId/graph.vue
/drafts/new -> 新規記事作成 /drafts/new.vue
```