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
},

  Vue.prototype.$getRelativeTags = async function getRelativeTags(tagId) {
    console.debug(`tagId (getRalativeTags() in firebaseUtils.js): ${tagId}`);
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
    console.debug(`tags (getRativeTags() in firebaseUtils.js) : ${relativeTags}`);
    return relativeTags
  },


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
  },

  Vue.prototype.$getArticles = async function getArticles(hobbeeId) {
    let articlesData = {};
    await db
      .collection("hobbees")
      .doc(hobbeeId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          articlesData[data.id] = data.data();
          // FIXME: Objectじゃなくてarrayにして hobbeeData.push(data.data())のほうが使いやすいかも
        });
      })
      .catch((e) => {
        console.error(e);
      });
    console.debug("data reloaded : ", articlesData)
    return articlesData
  }