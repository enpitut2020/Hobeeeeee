<template>
  <div>
    <div v-if="targetNode">
      <h1>タイトル:{{ title }} ID:{{ id }}</h1>
      <h2 class="h2">ターゲットのタイトル: {{ targetNode.title }}</h2>
      <nuxt-link :to="'/' + $route.params.hobbyId + '/list'"
        >記事を読む</nuxt-link
      >
      <div v-for="rNode in relativeNodes" :key="rNode.id">
        <HobbyNode :node="rNode" />
      </div>
    </div>
    <div v-else>
      <p>IDが不正です</p>
      <nuxt-link to="/">トップへ戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
//TODO:それをグラフっぽく表示
//TODO: volumeの反映
//TODO:ないIDのエラーハンドリング
export default {
  data() {
    return {
      title: "グラフ",
      id: this.$route.params.hobbyId,
      targetNode: {},
      relativeNodes: [],
    };
  },
  created() {
    this.targetNode = this.$hobbiesData[this.id];
    if (this.targetNode) {
      this.targetNode.relativeId.forEach((id) => {
        this.relativeNodes.push(this.$hobbiesData[id]);
      });
    }
  },
};
</script>

<style>
</style>