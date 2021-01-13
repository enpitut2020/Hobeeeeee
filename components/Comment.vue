<template>
  <div class="box">
    <div class="columns">
      <div class="column has-text-left">
        {{ comment.body }}
      </div>
      <div class="column has-text-right">at {{ commentTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: { type: Object, default: () => {} },
  },
  computed: {
    commentTime() {
      const timeFullString = this.comment.createdAt.toDate().toLocaleString();
      return timeFullString.substring(0, timeFullString.length - 3);
    },
  },
};
</script>

<style></style>
