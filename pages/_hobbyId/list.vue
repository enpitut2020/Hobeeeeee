<template>
  <div>
    <h1 class="title">{{ targetHobby.title }}の記事一覧です</h1>
    <ul>
      <li v-for="article in articlesData" :key="article.id">
        <ArticleThumbnail :article="article" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetHobby: this.$hobbiesData[this.$route.params.hobbyId],
      articlesData: [],
    };
  },
  created() {
    for (let key in this.targetHobby.articles) {
      this.articlesData.push(this.targetHobby.articles[key]);
    }
  },
};
</script>

<style>
</style>
