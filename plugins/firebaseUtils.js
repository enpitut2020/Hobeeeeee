import Vue from 'vue'
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();
/*
使うときは
this.$getNodesData().then(){
  //処理
}
みたいに使う
*/
Vue.prototype.$getNodesData = async()=> {
  let nodeData = [];
  await db
    .collection("hobbees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        nodeData.push(data.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("data reloaded : ", nodeData)
  return nodeData
},

  Vue.prototype.$getArticlesData = async (nodeId)=> {
    let articlesData = {};
    await db
      .collection("hobbees")
      .doc(nodeId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((data) => {
          articlesData.push(data.data())
        });
      })
      .catch((e) => {
        console.error(e);
      });
    console.debug("data reloaded : ", articlesData)
    return articlesData
  }