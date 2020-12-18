<template>
  <!-- 記事詳細画面 -->
  <div class="container">
    <div class="my-title-container">
      <h1 class="title">{{ title }}</h1>
      <div class="is-divider"></div>
      <nuxt-link
        :to="'/' + tag.id + '/graph'"
        v-for="tag in tags"
        :key="tag.id"
        class="tag"
      >
        {{ tag.name }}({{ tag.volume }})
      </nuxt-link>
      <mavon-editor
        v-model="content"
        language="ja"
        :subfield="false"
        :editable="false"
        :toolbarsFlag="false"
        :boxShadow="false"
        defaultOpen="preview"
        previewBackground="#fff"
      />
      <nuxt-link :to="'/' + currentTagId + '/list'">記事一覧へ戻る</nuxt-link>
      <button
        class="button"
        v-bind:class="{ 'is-success': isZbzbPushed == true }"
        v-on:click="zbzbButton()"
      >
        <span v-show="isZbzbPushed == false">{{ zbzb_count }} ずぶずぶ！</span>
        <span v-show="isZbzbPushed == true">{{ zbzb_count }} ずぶった！</span>
      </button>
    </div>
  </div>
</template>

<script>
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      title: "",
      tags: [],
      content: "",
      zbzb_count: null,
      isZbzbPushed: false,
      articleId: null,
      currentTagId: null,
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
    Promise.all(getTagsInfo).then((values) => {
      this.tags = values;
      console.log(values);
    });
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
  },
};
</script>
