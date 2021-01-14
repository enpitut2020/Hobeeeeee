<template>
  <div>
    <div class="section">
      <input v-model="title" class="input" placeholder="タイトル" />
      <div
        v-for="(searchText, index) in searchTexts"
        :key="'serchText-' + index"
      >
        <input
          v-model="searchTexts[index]"
          class="input"
          placeholder="タグ"
          name="yourarea"
          autocomplete="on"
          list="suggestList"
        />
      </div>
      <button @click="addTagSuggestBox()">+</button>
      <button @click="deleteTagSuggestBox()">-</button>
      <datalist id="suggestList">
        <option v-for="(n, index) in tagSuggestions" :key="n + index">
          {{ n }}
        </option>
      </datalist>
      <input v-model="author" class="input" placeholder="書いた人" />
      <mavon-editor
        v-model="content"
        :toolbars="markdownOption"
        language="ja"
        placeholder="記事を書いてね！"
      />
      <button type="button" class="button is-success" @click="submit">
        投稿する
      </button>
    </div>
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";

export default {
  async asyncData({ $getSuggestions }) {
    let data = await $getSuggestions();
    return { tagSuggestions: data.tagSuggestions };
  },
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      innerSearchText: "",
      author: "",
      searchTexts: [""],
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
    addTagSuggestBox() {
      this.searchTexts.push("");
    },

    deleteTagSuggestBox() {
      if (this.searchTexts.length > 1) {
        this.searchTexts.pop();
      }
    },

    submit: async function () {
      let timestamp = await this.$getFirebaseTimestamp();
      let article = {
        id: null,
        title: this.title,
        body: this.content,
        author: this.author ? this.author : "ほびーさん",
        tags: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      if (
        this.searchTexts[0] === "" ||
        this.title === "" ||
        this.content === "" ||
        this.author === ""
      ) {
        alert("未入力の項目があります");
        return;
      }

      if (!confirm(`以下の内容で投稿しますか？\n${this.title}`)) {
        return;
      }

      // await this.searchTexts.forEach(async (searchText, index) => {
      for await (let searchText of this.searchTexts) {
        let existingTag = await this.$getExistingTag(searchText);
        if (existingTag == null) {
          // 新規登録
          let newTagSuggestions = this.tagSuggestions;
          newTagSuggestions.push(searchText);
          let documentRefId = await this.$createTag(searchText);
          await this.$addTagSuggestions(newTagSuggestions);
          article.tags.push(documentRefId);
          console.debug("tag pushed :", article.tags);
        } else {
          article.tags.push(existingTag.id);
          // tagのvolumeを増やす
          console.debug("tag pushed :", article.tags);
          this.$incrementArticlesCount(existingTag.id, 1);
        }
      }

      console.debug("debug1 tags : ", article.tags);
      console.debug("debug1.1 : ", article);
      const transitionArticleId = await this.$registerArticle(article);
      const transitionTagId = article.tags[0];
      const pagePath = `/${transitionTagId}/${transitionArticleId}`;

      alert("記事を投稿しました!");
      this.$router.push(pagePath);
    },
  },
};
</script>
