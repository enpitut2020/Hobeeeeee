import Vue from 'vue'
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();
/*
//使うときは
this.$hobbiesData.then(){
}
みたいに使う
*/
Vue.prototype.$hobbiesData = async function getHobbeeData() {
  let hobbeeData = {};
  await db
    .collection("hobbees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        hobbeeData[data.id] = data.data();
        // FIXME: Objectじゃなくてarrayにして hobbeeData.push(data.data())のほうが使いやすいかも
        // なるほど修正やりますか??
        // issue投げて今度だな それですね!!
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("data reloaded : ", hobbeeData)
  return hobbeeData
},

  Vue.prototype.$getArticlesData = async function getArticlesData(hobbeeId) {
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