<template>
  <div>
    <header class="full">
      <h1 class="hero">Hobeeeeee!!</h1>
      <nuxt-link v-scroll-to="{ el: 'top'}" to="#" class="button hero_button">more</nuxt-link>
    </header>
    <section>
      <h1 class="h1">Hobeeeeee!!</h1>
    </section>


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
.container {
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.full {
  position: relative;
  min-height: 1255px;
  background: url("/hero_image.png")
    center top/cover no-repeat;
}

.hero {
  margin: 0;
  position: absolute;
  top: calc(50% - 2em);
  width: 100%;
  text-align: center;
  line-height: 1;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 8vw;
  text-shadow: 10px 10px 0 #fff;
}

.hero_button {
  margin: 0;
  position: absolute;
  top: calc(50% - 1.5em);
  line-height: 1;
}

section {
  padding: 2rem 0;
  text-align: center;
}

section h2 {
  font-size: 5vw;
  font-family: "Montserrat", sans-serif;
}

/* 
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.find-hobby {
  margin: 1em;
} */
</style>
