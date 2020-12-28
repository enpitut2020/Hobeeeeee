<template>
  <div>
    <div class="box">
      <!-- TODO: サムネイル画像を追加する -->
      <nuxt-link :to="`./${article.id}`" class="thumbnail">{{
        article.title
      }}</nuxt-link>
      <div>
        by {{ article.author ? article.author : "ほびーさん" }} at
        {{ article.createdAt.toDate().toLocaleDateString() }}
        {{ article.zbzbCount ? article.zbzbCount : 0 }}ずぶずぶ
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: JSON,
  },
};
</script>

<style>
.thumbnail {
  font-size: xx-large;
}
</style>
