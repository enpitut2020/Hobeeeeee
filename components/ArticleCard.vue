<template>
  <div class="card">
    <div class="card-content">
      <h1 class="card-header-title">{{ article.title }}</h1>
      <p>{{ article.contents }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: JSON,
  },
};
</script>
