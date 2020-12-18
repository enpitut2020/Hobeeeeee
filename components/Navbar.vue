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
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <!-- ナビゲーションバーの要素はここで増やす -->
      <div class="navbar-start">
        <nuxt-link to="/" class="navbar-item"> ホーム </nuxt-link>
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
</script>

<style>
</style>
