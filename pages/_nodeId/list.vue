<template>
  <div>
    <!-- TODO: title を取得<h1 class="title">{{ targetnode.title }}の記事一覧です</h1> -->
    <div v-if="articlesData.length !== 0">
      <ul>
        <li v-for="article in articlesData" :key="article.id">
          <ArticleThumbnail :article="article" />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>まだ記事がありません。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeId:this.$route.params.nodeId,
      articlesData: [],
    };
  },
  created() {
    //TODO
    this.$getArticlesData(this.nodeId).then((articles) => {
      this.articlesData = articles;
    });
  },
};
</script>

<style>
</style>
