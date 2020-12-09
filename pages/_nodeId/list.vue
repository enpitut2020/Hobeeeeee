<template>
  <div>
    <h1 class="title">{{ name }}の記事一覧です</h1>
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
  async asyncData({ params, $getTags, $getRelativeTags, $getArticles }) {
    const tags = await $getTags();
    const targetTag = tags.find(tag => tag.id === params.nodeId);
    const articles = await $getArticles(targetTag.id);
    return {
      name: targetTag.name,
      targetTag: targetTag,
      articles: articles
    };
  }
};
</script>

<style>
</style>
