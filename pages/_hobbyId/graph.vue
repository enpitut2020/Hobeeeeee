<template>
  <div>
    <div v-if="targetNode" class="flex_wrap">
      <h1>趣味の名前:{{ name }}</h1>
      <div class="node_now_div">
        <h2 class="h2">{{ targetNode.name }}</h2>
        <nuxt-link :to="'/' + $route.params.hobbyId + '/list?hobbyName=' + name"
          >記事を読む</nuxt-link
        >
      </div>
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
      name: "グラフ",
      id: this.$route.params.hobbyId,
      targetNode: {},
      relativeNodes: [],
    };
  },
  created() {
    this.$getTags().then((data) => {
      this.targetNode = data.filter((tmp) => {
        return tmp.id === this.id;
      });
      this.targetNode = this.targetNode[0]; //これで解決
      this.name = this.targetNode.name;
      console.log("this.targetNode.id" + this.targetNode.id);
      this.relativeNodes = this.$getRelativeTags(this.targetNode.id).then(
        (tag) => {
          console.debug(`tag relevance(graph.vue) : ${tag}`);
          this.relativeNodes.push(tag.id);
        }
      );
      console.debug(`target(graph.vue) : ${JSON.stringify(this.targetNode)}`);
      console.debug(`relativeNodes(graph.vue) : ${this.relativeNodes}`);
    });
  },
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
