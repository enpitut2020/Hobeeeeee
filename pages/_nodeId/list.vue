<template>
  <section class="section">
    <div class="container">
      <div class="content center mt-2">
        <nuxt-link :to="`/${targetTag.id}/graph`">趣味探しに戻る</nuxt-link>
        <h1 class="title mt-2">
          <font-awesome-icon icon="file-alt" /> {{ name }}の記事一覧
        </h1>
        <div v-if="articles.length === 0">
          <p>まだ記事がありません。</p>
        </div>
        <div v-else class="box">
          <div class="columns is-multiline">
            <div
              v-for="article in articles"
              :key="article.id"
              class="column is-full mx-3 my-3"
            >
              <ArticleThumbnail :article="article" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, $getTags, $getArticles }) {
    const tags = await $getTags();
    const targetTag = tags.find((tag) => tag.id === params.nodeId);
    const articles = await $getArticles(targetTag.id);
    return {
      name: targetTag.name,
      targetTag: targetTag,
      articles: articles,
    };
  },
};
</script>

<style>
.center {
  margin-left: auto;
  margin-right: auto;
}

.content {
  max-width: 800px;
}
</style>
