<template>
  <button class="button is-link is-light">
    <nuxt-link :to="'/' + node.id + '/graph/'"
      >関連の趣味 {{ node.title }}
    </nuxt-link>
  </button>
</template>
<script>
export default {
  props: ["node"],
};
</script>

<style scoped>
</style>