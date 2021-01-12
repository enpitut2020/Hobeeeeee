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
        <span class="tag is-primary"
          >{{ article.zbzbCount ? article.zbzbCount : 0 }} ずぶずぶ</span
        >
      </p>
    </div>
    <hr class="mb-1" />
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

.tag {
  vertical-align: top;
}
</style>
