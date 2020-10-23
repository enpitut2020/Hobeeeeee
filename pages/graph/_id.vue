<template>
  <div>
    <div v-if="targetNode">
      <h1>タイトル:{{ title }} ID:{{ id }}</h1>
      <h2 class="h2">ターゲットのタイトル: {{ targetNode.title }}</h2>
      <nuxt-link :to="'/articles/' + targetNode.id">記事を読む</nuxt-link>
      <div v-for="rNode in relativeNodes" :key="rNode.id">
      <HobbyNode :node="rNode"/>
        
      </div>
    </div>
    <div v-else>
      <p>IDが不正です</p>
      <nuxt-link to="/">トップへ戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
//TODO: 今いるノードの記事一覧へのリンク
//TODO:ランダムのノードへのリンク
//TODO:それをグラフっぽく表示
//TODO: volumeの反映
//TODO:ないIDのエラーハンドリング
export default {
  data() {
    return {
      title: "グラフ",
      id: this.$route.params.id,
      targetNode: {},
      relativeNodes: [],
    };
  },
  created() {
    this.targetNode = this.$nodeRelations[this.id];
    if (this.targetNode) {
      this.targetNode.relativeId.forEach((id) => {
        this.relativeNodes.push(this.$nodeRelations[id]);
      });
    }
  },
};
</script>

<style>
</style>