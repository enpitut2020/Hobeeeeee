<template>
<!-- 記事詳細画面 -->
  <div class="container">
    <div class="my-title-container">
      <h1 class="my-title">記事詳細：{{ title }}</h1>
      <h2 class="my-tag">タグ: {{ tag }}</h2>
      <div class="content">{{ content }}</div>
      <nuxt-link to="../articles/">記事一覧へ戻る</nuxt-link>
      <button class="button is-success" v-on:click="zbzb_count += 1">
        {{ zbzb_count }} ずぶずぶ！
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      tag: "",
      content: "",
      zbzb_count: 64,
    };
  },

  created() {
    // FIXME: db接続に書き換える
   this.$getArticlesData(this.$route.params.id)
      .then((result) => {
        this.title = result.title;
        this.content = result.content;
      })
      .catch((err) => {});
  },
  computed() {},
};
</script>
