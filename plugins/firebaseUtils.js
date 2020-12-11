import Vue from "vue";
import firebase from "@/plugins/firebase.js";
const db = firebase.firestore();
db.enablePersistence({ experimentalTabSynchronization: true }).then(() => {
  console.log("マルチタブでオフラインデータが使えるよ！");
});
/*
//使うときは
this.$hobbiesData.then(){
}
みたいに使う
*/
Vue.prototype.$getTags = async function getTags() {
  const tags = await db
    .collection("tags")
    .get({ source: "cache" })
    .then(querySnapshot => {
      console.debug("キャッシュからデータを取得しました");
      const tags = [];
      querySnapshot.forEach(data => {
        tags.push(data.data());
      });
      return tags;
    })
    .catch(async () => {
      return await db
        .collection("tags")
        .get({ source: "server" })
        .then(querySnapshot => {
          console.debug("サーバーからデータを取得しました");
          const tags = [];
          querySnapshot.forEach(data => {
            tags.push(data.data());
          });
          return tags;
        })
        .catch(e => {
          console.error(e);
        });
    });
  console.debug(`tags (getTags() in firebaseUtils.js) : ${tags}`);
  return tags;
};

//param いくつほしいか。含まないID
//@return Promise[array]
Vue.prototype.$getRandomTags = async (count = 1, notContain = []) => {
  return await Vue.prototype.$getTags().then(tags => {
    tags = tags.filter(tag => !notContain.includes(tag.id));
    const randTags = [];
    for (var i = 0; i < count; i++) {
      const randNum = Math.floor(Math.random() * tags.length); //TODO:同じ場合の処理
      randTags.push(tags[randNum]);
    }
    return randTags;
  });
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

Vue.prototype.$incrementRelevance = async (fromTag, currentTag) => {
  const fromCurrentTagRelativeRef = db
    .collection("tags")
    .doc(fromTag.id)
    .collection("relative")
    .doc(currentTag.id);
  const currentFromTagRelativeRef = db
    .collection("tags")
    .doc(currentTag.id)
    .collection("relative")
    .doc(fromTag.id);

  const currentFromTagRelation = await currentFromTagRelativeRef
    .get()
    .then(res => {
      return res.data(); //ここでreturnすると次のthenに引数で入る
    })
    .then(relation => {
      if (relation) {
        // console.debug("インクリメントします")
        fromCurrentTagRelativeRef.update({
          relevance: firebase.firestore.FieldValue.increment(1)
        });
        currentFromTagRelativeRef.update({
          relevance: firebase.firestore.FieldValue.increment(1)
        });
      } else {
        // console.debug("リレーションがないので追加します")
        fromCurrentTagRelativeRef.set({
          relevance: firebase.firestore.FieldValue.increment(1),
          name: currentTag.name,
          id: currentTag.id
        });
        currentFromTagRelativeRef.set({
          relevance: firebase.firestore.FieldValue.increment(1),
          id: fromTag.id,
          name: fromTag.name
        });
      }
    });
};

export default context => {
  //asyncDateではthisが使えないけどこれで登録すれば引数に取ればthisなしで使えるっぽい
  context.$getTags = Vue.prototype.$getTags;
  context.$getTag = Vue.prototype.$getTag;
  context.$getRandomTags = Vue.prototype.$getRandomTags;
  context.$getRelativeTags = Vue.prototype.$getRelativeTags;
  context.$getArticles = Vue.prototype.$getArticles;
};
// 現在時刻を取得する
Vue.prototype.$getFirebaseTimestamp = async function getFirebaseTimestamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
};
