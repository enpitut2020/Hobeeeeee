<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <!-- <img src="logo.png" alt="" /> -->
      </a>
      <div
        class="navbar-burger burger"
        v-bind:class="{ 'is-active': isMenuOpen }"
        v-on:click="toggleMenu()"
        data-target="navbarExampleTransparentExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div
      id="navbarExampleTransparentExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': isMenuOpen }"
    >
      <div class="navbar-start">
        <!-- Menu Item -->
        <div class="navbar-start">
          <a class="navbar-item" @click="$router.push('/')">Home</a>
          <a class="navbar-item" @click="$router.push(`/${randomId}/graph/`)"
            >趣味を探す</a
          >
          <a class="navbar-item" @click="$router.push(`/drafts/new`)"
            >記事を書く</a
          >
        </div>
      </div>
      <div class="navbar-end"></div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      randomId: -1,
      isMenuOpen: false,
    };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    },
  },
  async created() {
    await this.reloadTargetTag();
  },
  methods: {
    async reloadTargetTag() {
      let tags = await this.$getRandomTags();
      if (tags[0]) this.randomId = tags[0].id;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style></style>
