<template>
  <div>
    <div v-if="targetNode" class="flex_wrap">
      <h1>趣味の名前:{{ name }}</h1>
      <div class="node_now_div">
        <h2 class="h2">{{ targetNode.name }}</h2>
        <nuxt-link :to="'/' + $route.params.hobbyId + '/list'"
          >記事を読む</nuxt-link
        >
      </div>
      <div v-for="tag in relativeTags" :key="tag.id">
        <HobbyNode :tag="tag" />
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
      relativeTags: {},
    };
  },
  created() {
    this.$getTags().then((data) => {
      this.targetNode = data.filter((tmp) => {
        return tmp.id === this.id;
      });
      this.targetNode = this.targetNode[0]; //これで解決
      this.name = this.targetNode.name;
      console.debug(`this.name (created() in graph.vue): ${this.name}`);
      console.debug(`this.targetNode.id (created() in graph.vue): ${this.targetNode.id}`);
      console.debug(`this.target (created() in graph.vue) : ${JSON.stringify(this.targetNode)}`);
    });
    this.$getRelativeTags(this.id).then((tags) => {
      this.relativeTags = tags;
      console.debug(`tags (created() in graph.vue): ${tags}`);
      console.debug(`Object.keys(tags) (created() in graph.vue): ${Object.keys(tags)}`);
      console.debug(`this.relativeTags (created() in graph.vue) : ${this.relativeTags}`);
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
