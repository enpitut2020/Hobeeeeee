<template>
  <div>
    <div>いらない沼は埋め立てる</div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            沼の埋め立て地
          </h1>
        </div>
      </div>
    </section>
    <input v-model="targetNodeId" class="input" placeholder="削除するタグのID" />
    <button type="button" class="button is-success" @click="deleteTag">
      タグと記事をまるごと削除する
    </button>
    <input v-model="articleId" class="input" placeholder="削除する記事のID" />
    <button type="button" class="button is-success" @click="deleteArticle">
      記事を削除する
    </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        targetNodeId: "",
        articleId: "",
      };
    },
    methods: {
      // 管理画面的なやつ
      // (余力があったら)
      // - タグの一覧を取ってくる
      // - タグを一覧表示する
      deleteArticle: async function () {
        await this.$deleteArticle(this.articleId);
        this.articleId = "";
      },
      deleteTag: async function () {
        // ↓テスト用
        // 1DXHJ3HRQORTg9oMg3Pz: 飲酒

        // TODO: relativeサブコレクションのtags配列に含まれている該当タグを削除
        // - 各タグのrelative内をidで検索して、参照を取得する
        // TODO: タグ自体を削除
        await this.$deleteTag(this.targetNodeId);
        this.targetNodeId = "";
      },
    }
  }

</script>

<style></style>