<template>
  <div>
    <Logo />
    <h1 class="title">hobeeeeee</h1>
    <nuxt-link :to="randomId + '/graph/'">趣味を探す</nuxt-link>
    <nuxt-link to="/drafts/new">趣味を布教する</nuxt-link>
    <div class="columns"></div>
    <div>
      <p>firebaseから!!</p>
      {{ hobbeeData.title }}
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();

export default {
  async asyncData() {
    console.debug(db);
    let hobbeeData;
    await db
      .collection("hobbees")
      .doc("mOuvsY2QvNrePwNNRfNl")
      .get()
      .then((data) => {
        hobbeeData = data.data();
        console.debug(data.data());
      })
      .catch((e) => {
        console.error(e);
      });
    return { hobbeeData: hobbeeData };
  },

  data() {
    return {
      randomId: 1,
    };
  },

  created() {
    let nodeLength = Object.keys(this.$hobbiesData).length; //nodeRelationsオブジェクトの長さをとってくる
    this.randomId = this.getRandomInt(1, nodeLength);
  },
  methods: {
    getRandomInt: function (min, max) {
      console.debug(`rand: ${min} : ${max}`);
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
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
</style>
