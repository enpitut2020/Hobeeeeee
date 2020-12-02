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
export default {
  async asyncData({params, $getTags, $getRelativeTags})
  {
    const tags = await $getTags();
    const targetNode = tags.find(tag => tag.id === params.hobbyId);
    const name = targetNode.name ?? "グラフ";
    const relativeNodes = await $getRelativeTags(targetNode.id);
    return {
      name,
      targetNode,
      relativeNodes,
    };
  },
  data() {
    return {}
  },
  created() {
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
