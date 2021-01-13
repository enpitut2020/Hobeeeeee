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
    .get()
    .then((querySnapshot) => {
      console.debug("キャッシュからデータを取得しました");
      const tags = [];
      querySnapshot.forEach((data) => {
        tags.push(data.data());
      });
      return tags;
    })
    .catch(() => {
      alert("firestoreからのデータの取得でエラーが発生しました");
    });
  console.debug(`tags (getTags() in firebaseUtils.js) : ${JSON.stringify(tags)}`);
  return tags;
};

//param いくつほしいか。含まないID
//@return Promise[array]
Vue.prototype.$getRandomTags = async (count = 1, notContain = []) => {
  return await Vue.prototype.$getTags().then((tags) => {
    tags = tags.filter((tag) => !notContain.includes(tag.id));
    if (tags.length < count) {
      console.warn("ランダムのノードを取得できません");
      return [];
    }
    const randTags = [];
    do {
      const randNum = Math.floor(Math.random() * tags.length);
      if (!randTags.includes(tags[randNum])) {
        randTags.push(tags[randNum]);
      }
    } while (randTags.length < count);
    return randTags;
  });
};

Vue.prototype.$getTag = async function getTag(tagId) {
  return await db
    .collection("tags")
    .doc(tagId)
    .get()
    .then((data) => {
      return data.data();
    })
    .catch((e) => {
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
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        relativeTags.push(data.data());
      });
    })
    .catch((e) => {
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
    .then((querySnapshot) => {
      querySnapshot.forEach((data) => {
        hobbeeData.push(data.data());
      });
    })
    .catch((e) => {
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
    .then((docs) => {
      docs.forEach((doc) => {
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
    .then((doc) => {
      return doc.data();
    });
  console.debug(
    `article (getArticle() in firebaseUtils.js): ${JSON.stringify(article)}`
  );
  return article;
};

// DBに記事データを登録する
// 登録する記事のIDを返す
Vue.prototype.$registerArticle = async function registerArticle(article) {
  let ref = await db.collection("articles");
  console.debug("regiter article : "+JSON.stringify(article))
  return ref
    .add(article)
    .then((newArticle) => {
      ref.doc(newArticle.id).update({
        id: newArticle.id,
      });
      return newArticle.id;
    })
    .catch((e) => {
      console.log("register article error");
      console.error(e);
    });
};

Vue.prototype.$getExistingTag = async function getExistingTag(query) {
  var tagData = null;
  await db
    .collection("tags")
    .where("name", "==", query)
    .get()
    .then(function (querySnapshot) {
      //[document1,document2]
      querySnapshot.forEach(function (doc) {
        tagData = doc.data();
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  return tagData;
};

//趣味の記事が増えた、かつ趣味が新規の時、趣味データを作成
Vue.prototype.$createTag = async function createTag(tagName) {
  // ref = db.collection("tags").doc();
  let refId = db.collection("tags").doc().id;
  return await db
    .collection("tags")
    .doc(refId)
    .set({
      articlesCount: 1,
      id: refId,
      name: tagName,
      volume: 100,
    })
    .then(function () {
      console.log("Document successfully written!");
      return refId;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

//既存趣味の記事が増えた時、tagのvolumeを更新
Vue.prototype.$incrementArticlesCount = async function incrementArticlesCount(
  tagId, count
) {
  db.collection("tags")
    .doc(tagId)
    .update({
      articlesCount: firebase.firestore.FieldValue.increment(count),
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
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

  await currentFromTagRelativeRef
    .get()
    .then((res) => {
      return res.data(); //ここでreturnすると次のthenに引数で入る
    })
    .then((relation) => {
      if (relation) {
        // console.debug("インクリメントします")
        fromCurrentTagRelativeRef.update({
          relevance: firebase.firestore.FieldValue.increment(1),
        });
        currentFromTagRelativeRef.update({
          relevance: firebase.firestore.FieldValue.increment(1),
        });
      } else {
        // console.debug("リレーションがないので追加します")
        fromCurrentTagRelativeRef.set({
          relevance: firebase.firestore.FieldValue.increment(1),
          name: currentTag.name,
          id: currentTag.id,
        });
        currentFromTagRelativeRef.set({
          relevance: firebase.firestore.FieldValue.increment(1),
          id: fromTag.id,
          name: fromTag.name,
        });
      }
    });
};

Vue.prototype.$getSuggestions = async function getSuggestions() {
  return await db
    .collection("tagSuggestions")
    .doc("suggestions")
    .get()
    .then((data) => {
      return data.data();
    })
    .catch((e) => {
      console.error(e);
    });
};

Vue.prototype.$updateZbzbCount = async function updateZbzbCount(
  articleId,
  incrementNumber
) {
  db.collection("articles")
    .doc(articleId)
    .update({
      zbzbCount: firebase.firestore.FieldValue.increment(incrementNumber),
    });
};

Vue.prototype.$addTagSuggestions = async function addTagSuggestions(
  newTagSuggestions
) {
  db.collection("tagSuggestions")
    .doc("suggestions")
    .set({
      tagSuggestions: newTagSuggestions,
    })
    .then(function () {
      console.log("newTagSuggestions write success!");
    })
    .catch((e) => {
      console.error(e);
    })
};

// 記事を削除する
Vue.prototype.$deleteArticle = async function deleteArticle(articleId) {
  const article = await Vue.prototype.$getArticle(articleId);
  // 各tagIdについて
  for await (let tagId of article.tags) {
    // tagオブジェクトを取得
    const tag = await Vue.prototype.$getTag(tagId);
    if (tag.articlesCount === 1) {
      // 1つしか記事がなかったらタグを削除する
      // deleteTagをすると記事も消える
      await Vue.prototype.$deleteTag(tagId);
    } else {
      // 記事数を1減らす
      await Vue.prototype.$incrementArticlesCount(tagId, -1);
      // 記事を削除する
      await db.collection("articles")
        .doc(articleId)
        .delete()
        .then(() => {
          console.debug(`Article has been successfully deleted!: ${articleId}`);
        }).catch((error) => {
          console.error(`Error delete article: ${error}`);
        });
    }
  }
};

// 全ての記事から該当タグを除外する
// 該当タグしかついていなかったらその記事を削除
Vue.prototype.$deleteTagWithArticle = async function deleteTagWithArticle(targetNodeId) {
  await db
    .collection("articles")
    .where("tags", "array-contains", targetNodeId)
    .get()
    .then((queryResults) => {
      queryResults.forEach((doc) => {
        let article = doc.data();
        if (article.tags.length === 1) {
          // 該当タグしかついていなかったら、記事自体を削除する
          doc.ref.delete();
          console.debug(`Delete article (deleteTagWithArticle() in firebaseUtils.js): ${JSON.stringify(article)}`);
        } else {
          // 該当タグだけ削除する
          doc.ref.update({
            tags: firebase.firestore.FieldValue.arrayRemove(targetNodeId)
          });
          console.debug(`Remove tag (deleteTagWithArticle() in firebaseUtils.js): ${JSON.stringify(article)}`);
        }
      });
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    });
};

// 全てのタグのrelativeコレクションのtags配列からtargetNodeIdを削除する
Vue.prototype.$deleteTagInRelative = async function deleteTagInRelative(targetNodeId) {
  await db
    .collectionGroup("relative")
    .where("id", "==", targetNodeId)
    .get()
    .then((queryResults) => {
      queryResults.forEach((doc) => {
        doc.ref.delete();
      })
      console.debug(`tag in relative has been successfully deleted!: ${targetNodeId}`);
    }).catch((error) => {
      console.error(`Error delete article: ${error}`);
    })
};

// タグの推薦リストから該当タグを削除する
Vue.prototype.$removeTagFromSuggestions = async function removeTagFromSuggestions(targetNodeId) {
  const tag = await Vue.prototype.$getTag(targetNodeId);
  if (!tag) {
    return;
  }
  await db
    .collection("tagSuggestions")
    .doc("suggestions")
    .update({
      tagSuggestions: firebase.firestore.FieldValue.arrayRemove(tag.name)
    })
    .then(() => {
      console.debug(`TagSuggestion has been successfully deleted!: ${tag.name}`);
    }).catch((error) => {
      console.error(`Error delete TagSuggestion: ${error}`);
    })
};

// タグを削除する
Vue.prototype.$deleteTag = async function deleteTag(targetNodeId) {
  // タグの推薦リストから該当タグを削除する
  await Vue.prototype.$removeTagFromSuggestions(targetNodeId);
  // 全記事から該当タグを除外する
  await Vue.prototype.$deleteTagWithArticle(targetNodeId);
  // relativeに該当タグが含まれていたら、それを削除
  await Vue.prototype.$deleteTagInRelative(targetNodeId);
  // 該当タグ自身を削除
  db.collection("tags")
    .doc(targetNodeId)
    .delete()
    .then(() => {
      console.debug(`Tag has been successfully deleted!: ${targetNodeId}`);
    })
    .catch((error) => {
      console.error(`Error delete tag: ${error}`);
    });
};

/**
 * コメントを取得する
 * @param {String} articleId 記事のID
 */
Vue.prototype.$fetchComments = async function fetchComments(articleId) {
  return await db
    .collection("articles")
    .doc(articleId)
    .collection("comments")
    .get()
    .then((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      return comments;
    })
    .catch((error) => {
      console.error(`Error fetch comments: ${error}`);
    });
};

export default (context) => {
  //asyncDateではthisが使えないけどこれで登録すれば引数に取ればthisなしで使えるっぽい
  context.$getTags = Vue.prototype.$getTags;
  context.$getTag = Vue.prototype.$getTag;
  context.$getRandomTags = Vue.prototype.$getRandomTags;
  context.$getRelativeTags = Vue.prototype.$getRelativeTags;
  context.$getArticles = Vue.prototype.$getArticles;
  context.$getExistingTag = Vue.prototype.$getExistingTag;
  context.$createTag = Vue.prototype.$createTag;
  context.$incrementArticlesCount = Vue.prototype.$incrementArticlesCount;
  context.$getSuggestions = Vue.prototype.$getSuggestions;
  context.$addTagSuggestions = Vue.prototype.$addTagSuggestions;
  context.$deleteArticle = Vue.prototype.$deleteArticle;
  context.$deleteTag = Vue.prototype.$deleteTag;
  context.$fetchComments = Vue.prototype.$fetchComments;
};
// 現在時刻を取得する
Vue.prototype.$getFirebaseTimestamp = async function getFirebaseTimestamp() {
  return firebase.firestore.Timestamp.fromDate(new Date());
};
