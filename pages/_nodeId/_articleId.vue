<template>
  <!-- 記事詳細画面 -->
  <div class="container">
    <div class="my-title-container">
      <h1 class="my-title">記事詳細：{{ title }}</h1>
      <!-- <h2 class="my-tag">タグ: {{ tags[0] }}</h2> -->
      <div class="content">{{ content }}</div>
      <nuxt-link :to="'/' + tagId + '/list'">記事一覧へ戻る</nuxt-link>
      <button class="button is-success" v-on:click="zbzb_count += 1">
        <!-- {{ zbzb_count }} ずぶずぶ！4 -->
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      tags: [],
      content: "",
      zbzb_count: 64,
      articleId: null,
      tagId: null,
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
