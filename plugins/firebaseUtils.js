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
  let nodes = [];
  await db
    .collection("hobbees")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((node) => {
        nodes.push(node.data());
      });
    })
    .catch((e) => {
      console.error(e);
    });
  console.debug("data reloaded : ", nodes)
  return nodes
},

  Vue.prototype.$getArticlesData = async (nodeId)=> {
    let articles = [];
    await db
      .collection("hobbees")
      .doc(nodeId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((article) => {
          articles.push(article.data())
        });
      })
      .catch((e) => {
        console.error(e);
      });
    console.debug("data reloaded : ", articles)
    return articles
  }