<template>
  <!-- 記事詳細画面 -->
  <div class="container">
    <div class="my-title-container">
      <h1 class="title">{{ title }}</h1>
      <nuxt-link
        :to="'/' + tag.id + '/graph'"
        v-for="tag in tags"
        :key="tag.id"
      >
        {{ tag.name }}
      </nuxt-link>
      <mavon-editor
        v-model="content"
        language="ja"
        :subfield="false"
        :editable="false"
        :toolbarsFlag="false"
        :boxShadow="false"
        defaultOpen="preview"
        previewBackground="#fff"
      />
      <nuxt-link :to="'/' + tagId + '/list'">記事一覧へ戻る</nuxt-link>
      <!-- <button class="button is-success" v-on:click="zbzb_count += 1">
        {{ zbzb_count }} ずぶずぶ！
      </button> -->
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
      tags: [],
      content: "",
      zbzb_count: 64,
      articleId: null,
      tagId: null,
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

  async created() {
    console.log(
      `tagID (created() in _articleId.vue): ${this.$route.params.nodeId}`
    );
    console.log(
      `記事ID (created() in _articleId.vue): ${this.$route.params.articleId}`
    );
    this.articleId = this.$route.params.articleId;
    this.tagId = this.$route.params.nodeId;
    const article = await this.$getArticle(this.articleId);
    this.content = article.body;
    this.title = article.title;
    this.tags = article.tags;
  },
};
</script>
