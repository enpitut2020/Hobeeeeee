<template>
  <div>
    <div v-if="targetNode" class="flex_wrap">
      <h1>タイトル:{{ title }}</h1>
      <div class="node_now_div">
        <h2 class="h2">{{ targetNode.title }}</h2>
        <nuxt-link :to="'/' + $route.params.nodeId + '/list'"
          >記事を読む</nuxt-link
        >
      </div>
      <div v-for="rNode in relativeNodes" :key="rNode.id">
        <nodeNode :node="rNode" />
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
      id: this.$route.params.nodeId,
      targetNode: {},
      relativeNodes: []
    };
  },

  created() {
    this.$getNodesData().then(nodes => {
      this.targetNode = nodes.filter(tmp => {
        return tmp.id === this.id;
      });
      this.targetNode=this.targetNode[0]
      this.title = this.targetNode.title;
      this.relativeNodes = this.targetNode.relativeNodes;
      // FIXME: relativeNodesに関連する趣味を追加する
    });
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: #05668d;
}
.node_now_div {
  width: 33vw;
  height: 33vw;
  border-radius: 50%;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f3bd;
  border: solid 5px #f0f3bd;
}
.flex_wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vw;
}
</style>
