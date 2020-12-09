import Vue from "vue";
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
    .then(querySnapshot => {
      querySnapshot.forEach(data => {
        tags.push(data.data());
      });
    })
    .catch(e => {
      console.error(e);
    });
  console.debug(`tags (getTags() in firebaseUtils.js) : ${tags}`);
  return tags;
};

Vue.prototype.$getTag = async function getTag(tagId) {
  return await db
    .collection("tags")
    .doc(tagId)
    .get()
    .then(data => {
      return data.data();
    })
    .catch(e => {
      console.error(e);
    });
};
Vue.prototype.$getRelativeTags = async function getRelativeTags(tagId) {
  let relativeTags = [];
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

Vue.prototype.$hobbiesData = async function getHobbeeData() {
  let hobbeeData = [];
  await db
    .collection("hobbees")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(data => {
        hobbeeData.push(data.data());
      });
    })
    .catch(e => {
      console.error(e);
    });
  console.debug("data reloaded : ", hobbeeData);
  return hobbeeData;
};

Vue.prototype.$getArticles = async function getArticles(tagId) {
  let articles = [];
  await db
    .collection("articles")
    .where("tags", "array-contains", tagId)
    .get()
    .then(docs => {
      docs.forEach(doc => {
        articles.push(doc.data());
      });
    });
  console.debug(`articles (getArticles() in firebaseUtils.js): ${articles}`);
  return articles;
};

Vue.prototype.$getArticle = async function getArticle(articleId) {
  let article = await db
    .collection("articles")
    .doc(articleId)
    .get()
    .then(doc => {
      return doc.data();
    });
  console.debug(
    `article (getArticle() in firebaseUtils.js): ${JSON.stringify(article)}`
  );
  return article;
};

// DBに記事データを登録する
Vue.prototype.$registerArticle = async function registerArticle(article) {
  let ref = await db.collection("articles");
  let idRegistered;
  ref
    .add(article)
    .then(newArticle => {
      ref.doc(newArticle.id).update({
        id: newArticle.id
      });
      idRegistered = newArticle.id;
    })
    .catch(e => {
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




export default (context) => {
  context.$getTags = Vue.prototype.$getTags;
  context.$getRelativeTags = Vue.prototype.$getRelativeTags;
  context.$getArticles = Vue.prototype.$getArticles;
  context.$existTag = Vue.prototype.$existTag;
}
// 現在時刻を取得する
Vue.prototype.$getFirebaseTimestamp = async function getFirebaseTimestamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
};
