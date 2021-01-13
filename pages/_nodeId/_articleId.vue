<template>
  <section class="section">
    <div class="container is-max-desktop">
      <nuxt-link :to="'/' + currentTagId + '/list'">記事一覧へ戻る</nuxt-link>
      <h1 class="title mt-3 mb-0">{{ title }}</h1>
      <div class="level mb-0">
        <h2 class="subtitle">
          {{ authorName }} さんが{{ createdAt }}
          に投稿
        </h2>
        <div class="buttons is-right">
          <button
            class="button is-primary"
            :class="{ 'is-light': isZbzbPushed == false }"
            @click="zbzbButton()"
          >
            <span v-show="isZbzbPushed == false"
              >{{ zbzb_count }} ずぶずぶ</span
            >
            <span v-show="isZbzbPushed == true">
              {{ zbzb_count }}ずぶった!</span
            >
          </button>
          <button class="button share-button" @click="goTwitter()">
            <font-awesome-icon :icon="['fab', 'twitter']" />
            Tweet
          </button>
        </div>
      </div>
      <div class="tags">
        <nuxt-link
          v-for="(tag, index) in tags"
          :key="tag.id + index"
          :to="'/' + tag.id + '/graph'"
          class="tag is-warning is-rounded"
        >
          {{ tag.name }}({{ tag.articlesCount }})
        </nuxt-link>
      </div>
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
    </div>
  </section>
</template>

<script>
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      title: "",
      tags: [],
      content: "",
      createdAt: "",
      zbzb_count: null,
      isZbzbPushed: false,
      articleId: null,
      currentTagId: null,
      authorName: "",
      shareUrl: "",
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
    this.articleId = this.$route.params.articleId;
    this.currentTagId = this.$route.params.nodeId;
    const article = await this.$getArticle(this.articleId);
    this.createdAt = article.createdAt.toDate().toLocaleDateString();
    this.content = article.body;
    this.authorName = article.author ? article.author : "ほびー";
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
  },
};
</script>

<style>
.share-button {
  background-color: #55acee;
  color: #eee;
}

.v-note-show {
  font-family: heisei-maru-gothic-std, Meiryo, sans-serif;
  line-height: 2;
}
</style>
