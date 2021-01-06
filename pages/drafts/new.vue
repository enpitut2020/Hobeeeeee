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
        <option v-for="n in tagSuggestions" :key="n">{{ n }}</option>
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
    addTagSuggestBox(){
      this.searchTexts.push("")
    },

    deleteTagSuggestBox(){
      if(this.searchTexts.length > 1)
      {
        this.searchTexts.pop()
      }
    },

    submit: async function () {
      let timestamp = await this.$getFirebaseTimestamp();
      let article = {
        id: null,
        title: this.title,
        body: this.content,
        author: this.author ? this.author : "ほびーさん",
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

  let pagePath=""
    await this.searchTexts.forEach(async (searchText,index) => {
       
    
      let existingTag = await this.$getExistingTag(searchText);

     
//fix tagを複数。
      if (existingTag == null) {
        // 新規登録
        let newTagSuggestions = this.tagSuggestions;
        newTagSuggestions.push(searchText);
        let documentRefId = await this.$createTag(searchText);
        //FIX一見追加に書き換え
        await this.$addTagSuggestions(newTagSuggestions);
        article["tags"] = [documentRefId];
      } else {
        article["tags"] = [existingTag.id];
        // tagのvolumeを増やす
        this.$incrementArticlesCount(existingTag.id);
      }

     //これをForのそとでやらないと記事がn件登録されちゃう
      let transitionArticleId = await this.$registerArticle(article);
        let transitionTagId = article["tags"];
      if(index===0){
        pagePath=`/${transitionTagId}/${transitionArticleId}`
      }
      
       });

        alert("記事を投稿しました!");
        this.$router.push(pagePath);
    },
  },
};
</script>
