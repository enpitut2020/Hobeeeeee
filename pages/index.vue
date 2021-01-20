<template>
  <div>
    <div class="back_left"></div>
    <div class="back_right"></div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="svg-wrapper">
            <img src="/title.png" alt="" />
          </div>
          <div v-if="randomId !== ''" class="columns is-centered mt-5">
            <div class="column">
              <a
                class="button is-primary is-size-2 is-size-3-tablet is-size-4-mobile button_find"
                @click="$router.push(randomId + '/graph')"
              >
                <font-awesome-icon
                  icon="project-diagram"
                />&nbsp;&nbsp;趣味を探す
              </a>
            </div>
            <div class="column">
              <a
                class="button is-primary is-size-2 is-size-3-tablet is-size-4-mobile button_write"
                @click="$router.push('/drafts/new')"
              >
                &nbsp;
                <font-awesome-icon icon="pen-nib" />&nbsp;&nbsp;趣味を書く
              </a>
            </div>
          </div>
          <div v-else>Loading...</div>
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
            <h1 class="title">『Hobeeeeee!!』とは？</h1>
            <p>
              新しい趣味を見つけたい・広めたい人に向けたwebサービスなのだぁ。
            </p>
            <br />
            <h1 class="title">― 趣味を探す ―</h1>
            <p>
              趣味の沼を探索することであなたにぴったりの趣味を見つけることができるのだぁ。<br />
              趣味同士の関係はあなたの行動によってアップデートされていくのだぁ。
            </p>
            <br />
            <h1 class="title">― 趣味を書く ―</h1>
            <p>あなたが趣味を書くことでみんなに布教することができるのだぁ。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomId: "",
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
}

.svg-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.button_find {
  max-width: 70vw;
}

.button_write {
  max-width: 70%;
}
</style>
