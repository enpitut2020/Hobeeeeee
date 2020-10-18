<template>
  <div class="card">
    <div class="card-content">
      <h1 class="card-header-title">{{ this.article.title }}</h1>
      <p>{{ this.article.contents }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"]
};
</script>
