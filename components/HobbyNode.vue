<template>
  <div class="card relative-node">
    <nuxt-link :to="'/graph/' + node.id"
      >関連の趣味 {{ node.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["node"],
};
</script>
<style scoped>
.relative-node{
    background-color:#F18805
}
</style>

