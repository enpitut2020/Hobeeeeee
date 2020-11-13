<template>
  <div>
    <div v-if="targetNode" class="flex_wrap">
      <div class="node_now_div">
        <h1>タイトル:{{ title }}</h1>
        <h2 class="h2">{{ targetNode.title }}</h2>
        <nuxt-link :to="'/' + $route.params.hobbyId + '/list'"
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
        console.log(id)
      });
      //見栄えくするために、データの個数(nodeの個数）を９個する処理。
      if (this.relativeNodes.length < 9) {
        let lack = 9 - this.relativeNodes.length - 1
        for (let i = 0; i < lack ; i++) {
          this.relativeNodes.push(this.$hobbiesData[1])
        }
      }
    }
  },
};
</script>

<style>
  a{
    text-decoration:none;
    color: #05668d;
  }
  .node_now_div{
    width: 33vw;
    height: 33vw;
    border-radius: 50%;
    border: solid 1px black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color:#f0f3bd;
    border: solid 5px #f0f3bd;
  }
  .flex_wrap{
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vw;
  }
</style>