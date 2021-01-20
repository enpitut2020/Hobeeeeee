<template>
  <div>
    <div class="back_left"></div>
    <div class="back_right"></div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="svg-wrapper">
            <img src="/title.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <header class="full"></header>
    

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
}

.svg-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
