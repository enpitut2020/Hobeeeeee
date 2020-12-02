import Vue from 'vue'
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();
/*
//使うときは
this.$hobbiesData.then(){
}
みたいに使う
*/
Vue.prototype.$getTags = async function getTags() {
  let tags = [];
  await db
    .collection("tags")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        tags.push(data.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug(`tags (getTags() in firebaseUtils.js) : ${tags}`);
  return tags
};

Vue.prototype.$getRelativeTags = async function getRelativeTags(tagId) {
  let relativeTags = [];
  await db
    .collection("tags")
    .doc(tagId)
    .collection("relative")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        relativeTags.push(data.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("tags(getRativeTags) : ", relativeTags)
  return relativeTags
};


Vue.prototype.$hobbiesData = async function getHobbeeData() {
  let hobbeeData = [];
  await db
    .collection("hobbees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        hobbeeData.push(data.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("data reloaded : ", hobbeeData)
  return hobbeeData
};

Vue.prototype.$getArticles = async function getArticles(tagId) {
  let articles = [];
  await db
    .collection("articles")
    .where("tags", "array-contains", tagId)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        articles.push(doc.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug(`articles (getArticles() in firebaseUtils.js): ${articles}`);
  return articles
};

export default (context) => {
  context.$getTags = Vue.prototype.$getTags;
  context.$getRelativeTags = Vue.prototype.$getRelativeTags;
}