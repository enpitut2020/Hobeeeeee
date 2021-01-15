<template>
  <div>
    <div class="back_left"></div>
    <div class="back_right"></div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="svg-wrapper">
            <!-- prettier-ignore -->
            <svg xmlns="http://www.w3.org/2000/svg" width="1474" height="328.5" viewBox="0 0 1474 328.5">
              <g id="hobeeeeee" transform="translate(-232.5 -460)">
                <g id="title">
                  <text id="title_shadow" transform="translate(969.5 675)" fill="#444242" stroke="#555151" stroke-width="5" font-size="195" font-family="Impetus-Heavy, Impetus" font-weight="800"><tspan x="-731.055" y="0">Hobeeeeee!!</tspan></text>
                  <text id="title_text" transform="translate(969.5 660)" fill="#67d5b5" stroke="#555151" stroke-width="5" font-size="195" font-family="Impetus-Heavy, Impetus" font-weight="800"><tspan x="-731.055" y="0">H</tspan><tspan y="0" fill="#f38181">o</tspan><tspan y="0">b</tspan><tspan y="0" fill="#fce38a">e</tspan><tspan y="0">e</tspan><tspan y="0" fill="#fce38a">e</tspan><tspan y="0">e</tspan><tspan y="0" fill="#fce38a">e</tspan><tspan y="0">e</tspan><tspan y="0" fill="#fce38a">!!</tspan></text>
                </g>
                <g id="copy">
                  <text id="copy_shadow" transform="translate(968.5 763.5)" fill="#444242" stroke="#3e3939" stroke-width="3" font-size="80" font-family="AzoSans-Black, Azo Sans" font-weight="800"><tspan x="-492.32" y="0">Sorry for my funny hobby</tspan></text>
                  <text id="copy_text" transform="translate(968.5 753.5)" fill="#fff" stroke="#3e3939" stroke-width="3" font-size="80" font-family="AzoSans-Black, Azo Sans" font-weight="800"><tspan x="-492.32" y="0">Sorry for my funny hobby</tspan></text>
                </g>
              </g>
            </svg>
          </div>
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

.back_left {
  height: 100%;
  width: 50%;
  position: fixed;
  right: 50%;
  margin-right: 31%;
  background-position: right top;
  background-repeat: repeat;
  background-image: url("/hero_image.png");
  background-size: 75%;
  display: block;
}

.back_right {
  height: 100%;
  width: 50%;
  position: fixed;
  left: 50%;
  margin-left: 32%;
  background-repeat: repeat;
  background-image: url("/hero_image.png");
  background-size: 75%;
  display: block;
}

.svg-wrapper {
  position: relative;
  width: 100%;
  padding-top: 30%; /* SVG高さ / SVG幅 * 100 */
}

.svg-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
