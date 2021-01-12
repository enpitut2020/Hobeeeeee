<template>
  <div>
    <section class="section">
      <div class="container is-max-desktop">
        <h1 class="title"><font-awesome-icon icon="pen-nib" /> 記事を書く</h1>
        <h2 class="subtitle">沼る記事を書こう！的な文</h2>
        <div class="field">
          <label class="label">タイトル</label>
          <div class="control">
            <input v-model="title" class="input" placeholder="記事のタイトル" />
          </div>
        </div>
        <div class="field">
          <div class="level mb-0">
            <label class="label">タグ</label>
            <button
              class="button is-rounded is-small"
              @click="addTagSuggestBox()"
            >
              タグを追加
            </button>
          </div>
          <div class="control">
            <div class="columns is-multiline">
              <div
                v-for="(searchText, index) in searchTexts"
                :key="'serchText-' + index"
                class="column has-text-right is-6"
              >
                <div class="level">
                  <input
                    v-model="searchTexts[index]"
                    class="input"
                    placeholder="記事に関するタグ"
                    name="yourarea"
                    autocomplete="on"
                    list="suggestList"
                  />
                  <a
                    v-show="searchTexts.length > 1"
                    class="delete ml-2"
                    @click="deleteTagSuggestBox(index)"
                  ></a>
                </div>
              </div>
              <datalist id="suggestList">
                <option v-for="(n, index) in tagSuggestions" :key="n + index">
                  {{ n }}
                </option>
              </datalist>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">書いた人</label>
          <div class="control">
            <input
              v-model="author"
              class="input"
              placeholder="書いた人のなまえ"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">本文</label>
          <div class="control">
            <mavon-editor
              v-model="content"
              :toolbars="markdownOption"
              language="ja"
              placeholder="記事を書いてね！"
              class="mavon-editor"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-right">
            <button type="button" class="button" @click="submit">
              投稿する！
            </button>
          </div>
        </div>
      </div>
    </section>
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
        htmlcode: true,
        help: true,
      },
    };
  },

  methods: {
    addTagSuggestBox() {
      this.searchTexts.push("");
    },

    deleteTagSuggestBox(index) {
      if (this.searchTexts.length > 1) {
        this.searchTexts.splice(index, 1);
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

<style>
.center {
  margin-left: auto;
  margin-right: auto;
}
/* 
.section {
  max-width: 800px;
} */

.mavon-editor {
  max-height: 1vh;
}

.v-note-show {
  font-family: heisei-maru-gothic-std, Meiryo, sans-serif;
}
</style>
