<template>
  <div class="container">
    <div v-if="randomId !== ''">
      <Logo />
      <nuxt-link :to="randomId + '/graph/'" class="button find-hobby"
        >趣味を見つける</nuxt-link
      >
      <nuxt-link to="/drafts/new" class="button find-hobby"
        >趣味を広める</nuxt-link
      >
    </div>
    <div v-else>Loading...</div>
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
}
</style>
