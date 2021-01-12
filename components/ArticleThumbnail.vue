<template>
  <div>
    <!-- TODO: サムネイル画像を追加する -->
    <nuxt-link :to="`./${article.id}`" class="thumbnail">{{
      article.title
    }}</nuxt-link>
    <div>
      <p>
        {{ article.author ? article.author : "ほびー" }} さんが
        {{ article.createdAt.toDate().toLocaleDateString() }} に投稿
        <span class="zbzb_count">
          {{ article.zbzbCount ? article.zbzbCount : 0 }}</span
        >
        <img src="/zbzb.png" class="zbzb" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: { type: Object, default: () => {} },
  },
};
</script>

<style>
.thumbnail {
  font-size: x-large;
  font-weight: bold;
}

.zbzb_count {
  color: #66d4b4;
}

.zbzb {
  height: 20px;
  width: 20px;
  vertical-align: top;
}
</style>
