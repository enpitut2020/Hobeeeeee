<template>
  <div>
    <div class="section">
      <h1 class="title is-3">記事投稿画面</h1>
      <nuxt-link to="/">トップへ戻る</nuxt-link>
      <input class="input" placeholder="タイトル" v-model="title" />
      <input class="input" placeholder="タグ" v-model="tags" />
      <mavon-editor
        v-model="content"
        :toolbars="markdownOption"
        language="ja"
        placeholder="編集を始めてね！"
      />
      <!-- FIXME: 送信したら投稿した記事の画面に遷移するようにする -->
      <button v-on:click="submit" class="button is-success">submit</button>
    </div>
  </div>
</template>

<script>
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: false,
        readmodel: true,
        htmlcode: true,
        help: true,
      },
    };
  },
  methods: {
    submit: async function (event) {
      let timestamp = await this.$getFirebaseTimestamp();
      let article = {
          id: null,
          title: this.title,
          body: this.content,
          // FIXME: 著者名を入力フォームから取得する
          author: "名無しさん",
          createdAt: timestamp,
          updatedAt: timestamp}
      let existingTag = await this.$getExistingTag(this.tags)
      console.log(existingTag)

      alert(`以下の内容で投稿しますか？\n${this.title}`);

      if (existingTag == null) {
        //新規登録
        console.log("existing tag is null")
        // let documentRef = await this.$createTag(this.tags)
        // console.log("documentRef is .." +  documentRef)
        // article["tags"] = [{id: documentRef.id, name: this.tags}]
        
      }else{
        article["tags"] = [{ id: existingTag.id, name: existingTag.name }];
        console.log("article tags is...." + article.tags);
          // FIXME: 入力フォームから取得したタグ名を元にタグIDを取得して配列に格納する
          // 仮データとしてサッカーのタグを選択している
          // tags: ["4qqOzg7eEx2vsBIcjTTq"],
        //tagのvolumeを増やす
        this.$incrementArticlesCount(existingTag.id)
      }

      await this.$registerArticle(article);
    },
  },
};
</script>
