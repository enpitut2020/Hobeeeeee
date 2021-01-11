<template>
  <section class="section">
    <div class="container">
      <div class="content">
        <h1 class="title">{{ name }}の記事一覧です</h1>
        <nuxt-link :to="`/${targetTag.id}/graph`">趣味探しに戻る</nuxt-link>
        <div v-if="articles.length === 0">
          <p>まだ記事がありません。</p>
        </div>
        <div v-else>
          <div v-for="article in articles" :key="article.id">
            <ArticleThumbnail :article="article" />
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

<style></style>
