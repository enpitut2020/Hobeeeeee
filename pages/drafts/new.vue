<template>
  <div>
    <div class="section">
      <h1 class="title  is-3">記事投稿画面</h1>
      <nuxt-link to="/">トップへ戻る</nuxt-link>
      <input class="input" placeholder="タイトル" v-model="title" />
      <mavon-editor
        v-model="content"
        :toolbars="markdownOption"
        language="ja"
        placeholder="編集を始めてね！"
      />
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
        help: true
      }
    };
  },
  methods: {
    submit: function(event) {
      alert(this.content);
    }
  }
  // TODO: 記事を投稿する（dbに登録する）
};
</script>
