<template>
  <div>
    <h1 class="title">{{ targetHobby.title }}の記事一覧です</h1>
    <div v-if="Object.keys(articlesData).length !== 0">
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
      // targetHobby: this.$hobbiesData[this.$route.params.hobbyId],
      targetHobby: {},
      articlesData: [],
    };
  },
  created() {
    this.$hobbiesData().then((data) => {
      this.articlesData = data;
      this.targetHobby = data[this.$route.params.hobbyId];
    });
    //TODO: articles取得
  },
};
</script>

<style>
</style>
