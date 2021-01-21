<template>
  <section class="section mt-5">
    <div class="container is-max-desktop">
      <nuxt-link :to="`/${targetTag.id}/graph`">趣味探しに戻る</nuxt-link>
      <h1 class="title mt-3">
        <font-awesome-icon icon="file-alt" /> {{ name }}の記事一覧
      </h1>
      <div v-if="articles.length === 0">
        <p>まだ記事がありません。</p>
      </div>
      <div v-else class="box">
        <div class="columns is-multiline mt-2">
          <div
            v-for="article in articles"
            :key="article.id"
            class="column is-full mx-3"
          >
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
