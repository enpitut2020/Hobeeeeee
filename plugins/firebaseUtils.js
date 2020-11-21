import Vue from "vue";
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();
/*
//使うときは
this.$getTags.then(){
}
みたいに使う
*/
Vue.prototype.$getTags = async function() {
  const tags = [];
  await db
    .collection("tags")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(data => {
        tags.push(data.data());
      });
    })
    .catch(e => {
      console.error(e);
    });
  console.debug("tags(getTags) : ", tags);
  return tags;
};

Vue.prototype.$getRelativeTags = async function(tagId) {
  const relativeTags = [];
  await db
    .collection("tags")
    .doc(tagId)
    .collection("relative")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(data => {
        relativeTags.push(data.data());
      });
    })
    .catch(e => {
      console.error(e);
    });
  console.debug("tags(getRativeTags) : ", relativeTags);
  return relativeTags;
};


Vue.prototype.$getArticles = async (hobbeeId)=> {
  let articlesData = {};
  await db
    .collection("hobbees")
    .doc(hobbeeId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(data => {
        articlesData[data.id] = data.data();
        // FIXME: Objectじゃなくてarrayにして hobbeeData.push(data.data())のほうが使いやすいかも
      });
    })
    .catch(e => {
      console.error(e);
    });
  console.debug("data reloaded : ", articlesData);
  return articlesData;
};
