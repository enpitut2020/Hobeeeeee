<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title hero_text">Hobeeeeee!!</h1>

          <nuxt-link
            v-scroll-to="'#explanation'"
            to
            class="button is-warning is-inverted is-outlined hero_button"
          >
            more
          </nuxt-link>
        </div>
      </div>
    </section>
    <header class="full"></header>
    <section class="section">
      <div class="container is-max-desktop">
        <div id="explanation">
          <div class="box">
            <h1 class="title">Hobeeeeee!!</h1>
            <p>
              サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
            </p>
            <br />
            <p>
              サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキ
            </p>
            <br />
            <p>
              ストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
            </p>
          </div>
        </div>

        <!-- <div v-if="randomId !== ''">
      <nuxt-link :to="randomId + '/graph/'" class="button"
        >趣味を見つける</nuxt-link
      >
      <nuxt-link to="/drafts/new" class="button find-hobby"
        >趣味を広める</nuxt-link
      >
    </div>
    <div v-else>Loading...</div> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hobbeeData: {},
      randomId: "",
      title: "",
    };
  },

  async created() {
    let tag = await this.$getRandomTags(1);
    if (tag[0]) this.randomId = tag[0].id;
  },
};
</script>

<style>
.hero_text {
  font-family: impetus, sans-serif;
  font-size: 10em;
}
</style>
