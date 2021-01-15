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
    // コメントの横に表示するタイムスタンプ
    commentTime() {
      // 日本時間に固定
      const locale = "ja";
      // YYYY/MM/DD hh:mm
      const options = { dateStyle: "medium", timeStyle: "short" };
      // Dateオブジェクト -> 文字列
      return this.comment.createdAt.toDate().toLocaleString(locale, options);
    },
  },
};
</script>

<style></style>
