<template>
  <div class="box">
    <div class="columns">
      <div class="column has-text-left">
        {{ comment.body }}
      </div>
      <div class="column has-text-right">
        at {{ comment.createdAt.toDate().toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: { type: Object, default: () => {} },
  },
};
</script>

<style></style>
