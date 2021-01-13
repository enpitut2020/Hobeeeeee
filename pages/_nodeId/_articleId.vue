<template>
  <!-- 記事詳細画面 -->
  <div class="container">
    <div class="my-title-container">
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">書いた人: {{ authorName }}</h2>
      <div class="is-divider"></div>
      <nuxt-link
        v-for="tag in tags"
        :key="tag.id"
        :to="'/' + tag.id + '/graph'"
        class="tag"
      >
        {{ tag.name }}({{ tag.articlesCount }})
      </nuxt-link>
      <mavon-editor
        v-model="content"
        language="ja"
        :subfield="false"
        :editable="false"
        :toolbars-flag="false"
        :box-shadow="false"
        default-open="preview"
        preview-background="#fff"
      />
      <nuxt-link :to="'/' + currentTagId + '/list'" class="button"
        >記事一覧へ戻る</nuxt-link
      >
      <button
        class="button"
        :class="{ 'is-success': isZbzbPushed == true }"
        @click="zbzbButton()"
      >
        <span v-show="isZbzbPushed == false">{{ zbzb_count }} ずぶずぶ！</span>
        <span v-show="isZbzbPushed == true">{{ zbzb_count }} ずぶった！</span>
      </button>
      <button class="button share-button" @click="goTwitter()">Tweet</button>
      <!-- TODO: コメント投稿フォーム -->
      <!-- - 各記事詳細画面の下の方に，コメントを各機能を入れる
      - コメント書く所，送信ボタンの簡単な設計でいい
      - ただのテキストをfirebaseの各記事に登録する
      - 各記事のサブコレクションにcommentsを入れる -->
      <div class="columns">
        <input
          v-model="submittingComment"
          class="input column"
          placeholder="コメント"
        />
        <button
          v-bind:disabled="isNoComment()"
          type="button"
          class="button column is-one-fifth"
          :class="{ 'is-success': !isNoComment() }"
          @click="submit"
        >
          コメントする
        </button>
      </div>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <Comment :comment="comment" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";

export default {
  async asyncData({ params, $fetchComments }) {
    // コメントを取得
    const comments = await $fetchComments(params.articleId);
    return {
      title: "",
      tags: [],
      content: "",
      zbzb_count: null,
      isZbzbPushed: false,
      articleId: null,
      currentTagId: null,
      authorName: "ほびーさん",
      shareUrl: "",
      // DBから取得したコメントの配列
      comments: comments,
      // DBに登録する予定のコメントの文字列
      submittingComment: "",
      // コメント入力欄が空文字列
      noComment: true,
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: false,
        readmodel: true,
        htmlcode: true,
        help: true,
      },
    };
  },

  async created() {
    console.log(
      `tagID (created() in _articleId.vue): ${this.$route.params.nodeId}`
    );
    console.log(
      `記事ID (created() in _articleId.vue): ${this.$route.params.articleId}`
    );
    this.articleId = this.$route.params.articleId;
    this.currentTagId = this.$route.params.nodeId;
    const article = await this.$getArticle(this.articleId);
    this.content = article.body;
    this.authorName = article.author ? article.author : "ほびーさん";
    this.title = article.title;
    if (article.zbzbCount == null) {
      this.zbzb_count = 0;
    } else {
      this.zbzb_count = article.zbzbCount;
    }
    const getTagsInfo = [];
    article.tags.forEach((tag) => {
      getTagsInfo.push(this.$getTag(tag));
    });
    this.tags = await Promise.all(getTagsInfo);
    let hashtag = "%23Hobeeeeee";
    const tweetText = `Hobeeeeee!!の「${this.title}」で${this.tags[0].name}の沼を覗こう!! ${hashtag}`;
    this.shareUrl = `https://twitter.com/share?text=${tweetText}&url=${location.href}`;
  },

  methods: {
    zbzbButton() {
      // ZBZBButtonが押されたときの処理
      console.log("zbzb button pushed");
      // isButtonPushedがfalseの時、ずぶずぶカウントが1増え、trueの時1減る
      if (this.isZbzbPushed) {
        this.zbzb_count -= 1;
        this.isZbzbPushed = false;
        this.$updateZbzbCount(this.articleId, -1);
      } else {
        this.zbzb_count += 1;
        this.isZbzbPushed = true;
        this.$updateZbzbCount(this.articleId, 1);
      }
    },
    goTwitter() {
      window.open(this.shareUrl);
    },
    isNoComment() {
      return this.submittingComment === "";
    },
    submit() {
      console.debug(`submitted comment: ${this.submittingComment}`);
      this.submittingComment = "";
    },
  },
};
</script>

<style scoped>
.share-button {
  background-color: #00acee;
  color: #eee;
}
</style>
