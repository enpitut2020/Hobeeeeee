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
  console.debug(`articles (getArticles() in firebaseUtils.js): ${articles}`);
  return articles;
}

// DBに記事データを登録する
Vue.prototype.$registerArticle = async function registerArticle(article) {
  let ref = await db.collection("articles");
  let idRegistered;
  ref.add(article)
    .then((newArticle) => {
      ref.doc(newArticle.id).update({
        id: newArticle.id
      })
      idRegistered = newArticle.id;
    })
    .catch((e) => {
      console.error(e);
    });
};

Vue.prototype.$existTag = async function existTag(query) {
  var tagId = null
  await db.collection("tags").where("name", "==", query)
  .get()
  .then(function(querySnapshot) {
    //[document1,document2]
    querySnapshot.forEach(function(doc) {
      tagId = doc.id
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
  return tagId
}

//趣味の記事が増えた、かつ趣味が新規の時、趣味データを作成
Vue.prototype.$createTag = async function createTag(tagName) {
  let ref = db.collection("tags").doc()
  ref.set({
    articlesCount: 1,
    id: ref.id,
    name: tagName,
    volume:100
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

//既存趣味の記事が増えた時、tagのvolumeを更新
Vue.prototype.$updateTag = async function updateTag(tagId) {
  db.collection("tags").doc(tagId).update({
    volume: firebase.firestore.FieldValue.increment(1),
  })
  .then(function() {
    console.log("Document successfully updated!");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });
}

export default (context) => {
  context.$getTags = Vue.prototype.$getTags;
  context.$getRelativeTags = Vue.prototype.$getRelativeTags;
  context.$getArticles = Vue.prototype.$getArticles;
  context.$existTag = Vue.prototype.$existTag;
  context.$createTag = Vue.prototype.$createTag;
  context.$updateTag = Vue.prototype.$updateTag;
}
// 現在時刻を取得する
Vue.prototype.$getFirebaseTimestamp = async function getFirebaseTimestamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
}

