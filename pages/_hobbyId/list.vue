<template>
  <div>
    <h1 class="title">{{ $route.query.hobbyName }}の記事一覧です</h1>
    <div v-if="articles.length === 0">
      <p>まだ記事がありません。</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="article in articles" :key="article.id">
          <ArticleThumbnail :article="article" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  created() {
    let tagId = this.$route.params.hobbyId;
    this.$getArticles(tagId).then((articles) => {
      this.articles = articles;
    });
  },
};
</script>

<style>
</style>
