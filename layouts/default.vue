<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function () {
      this.$adobeFonts(document);
    });
  },
};
</script>

<style>
html {
  visibility: hidden;
}
html.wf-active {
  visibility: visible;
}
</style>
