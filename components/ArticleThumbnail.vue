<template>
  <!--TODO:リンクを追加-->
  <div>
    {{ article }}
    <div>title={{ article }}</div>
    <div>author={{ article.author }}</div>
    <div>body={{ article.body }}</div>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style>
</style>