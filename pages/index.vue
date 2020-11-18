<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">hobeeeeee</h1>
      <nuxt-link :to="randomId + '/graph/'">趣味を探す</nuxt-link>
      <nuxt-link to="/drafts/new">趣味を布教する</nuxt-link>
      <div class="columns"></div>
      <div>
        <p>firebaseから!!</p>
        {{ title }}
        {{ randomId }}
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      nodeData: {},
      randomId: "",
      title: ""
    };
  },

  created() {
    this.$getNodesData()
      .then(result => {
        this.nodeData = result;
        this.randomId = this.nodeData[
          this.getRandomInt(0, this.nodeData.length - 1)
        ].id;
      })
      .catch(err => {
        alert("データの取得でエラーが発生しました。")
      });
  },

  computed: {},

  methods: {
    getRandomInt: function(min, max) {
      const randNum = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      console.debug("rand : ", randNum);
      return randNum;
    }
  }
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
