<template>
  <div>
    <Logo />
    <h1 class="title">hobeeeeee</h1>
    <nuxt-link :to="randomId + '/graph/'">趣味を探す</nuxt-link>
    <nuxt-link to="/drafts/new">趣味を布教する</nuxt-link>
    <div class="columns"></div>
    <div>
      <p>firebaseから!!</p>
      {{ hobbeeData[0].title }}
      {{ randomId }}
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();

export default {
  async asyncData() {
    let hobbeeData = [];
    await db
      .collection("hobbees")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          hobbeeData.push(data.data());
          console.debug("data.data(): ", data.data());
        });
      })
      .catch((e) => {
        console.error(e);
      });
    return { hobbeeData: hobbeeData };
  },

  computed: {
    randomId() {
      return this.hobbeeData[this.getRandomInt(0, this.hobbeeData.length - 1)]
        .id;
    },
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
