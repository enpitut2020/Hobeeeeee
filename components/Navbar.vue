<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- TODO: ここにプロダクトのロゴとリンクを張る -->
      <!--
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>
      -->

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': isMenuOpen }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isMenuOpen }"
    >
      <!-- ナビゲーションバーの要素はここで増やす -->
      <div class="navbar-start">
        <nuxt-link to="/" class="navbar-item"> ホーム </nuxt-link>
        <nuxt-link
          :to="`/${randomId}/graph/`"
          class="navbar-item"
          @click.native="reloadTargetTag"
          >趣味を探す</nuxt-link
        >
        <nuxt-link to="/drafts/new" class="navbar-item"> 記事を書く </nuxt-link>
      </div>

      <!-- ユーザ認証など、バーの末尾から表示したいものをここに追加する -->
      <!--
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
      -->
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
      this.randomId = tags[0].id;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style></style>
