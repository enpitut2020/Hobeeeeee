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
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("data reloaded : ", hobbeeData)
  return hobbeeData
}