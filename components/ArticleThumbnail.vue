<template>
  <!--TODO:リンクを追加-->
  <div>
  <div class="box">
    <nuxt-link :to="'./' + article.id">{{ article.title }}</nuxt-link>
  </div>
 
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style>
</style>