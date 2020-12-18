<template>
  <div>
    <div class="section">
      <h1 class="title is-3">記事投稿画面</h1>
      <input class="input" placeholder="タイトル" v-model="title" />
      <input class="input" placeholder="タグ" name="yourarea" autocomplete="on" list="suggestList" v-model="searchText"/>  
      <datalist id="suggestList">  
        <option v-for="n in tagSuggestions" :key="n">{{n}}</option>
      </datalist>
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

import Vue from "vue";
import firebase from "@/plugins/firebase.js";
const myDb = firebase.firestore();

export default {
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      innerSearchText: '',
      tagSuggestions: [],
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
  async asyncData ({ params, $getSuggestions }) {
    let data = await $getSuggestions()
    return {tagSuggestions: data.tagSuggestions};
  },
  computed: {
    searchText: {
      get () {
        return this.innerSearchText
      },
      set (value) {
        this.innerSearchText = value
      }
    }
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
      let existingTag = await this.$getExistingTag(this.searchText)

      alert(`以下の内容で投稿しますか？\n${this.title}`);

      if (existingTag == null) {
        //新規登録

        let newTagSuggestions = this.tagSuggestions
        newTagSuggestions.push(this.searchText)
        let documentRefId = await this.$createTag(this.searchText)
        await this.$addTagSuggestions(newTagSuggestions)
        article["tags"] = [documentRefId]
        
      }else{
        article["tags"] = [existingTag.id];
          // FIXME: 入力フォームから取得したタグ名を元にタグIDを取得して配列に格納する
          // 仮データとしてサッカーのタグを選択している
          // tags: ["4qqOzg7eEx2vsBIcjTTq"],
        //tagのvolumeを増やす
        this.$incrementArticlesCount(existingTag.id)
      }

      await this.$registerArticle(article);
      this.$router.push('/');
    },
  },
};
</script>
