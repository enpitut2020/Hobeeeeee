<template>
  <div>
    <nuxt-link :to="'/'+targetTag.id+'/list'">{{ name }}の記事を読む</nuxt-link>
    <GraphSvg 
      :targetNode="targetTag"
      :relativeNodes="relativeTags"
      :name="name"
    />
    <GraphCanvas
      :targetNode="targetTag"
      :relativeNodes="relativeTags"
      :name="name"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $getTags, $getRelativeTags }) {
    const tags = await $getTags();
    const targetTag = tags.find(tag => tag.id === params.nodeId);
    const relativeTags = await $getRelativeTags(targetTag.id);
    return {
      name: targetTag.name,
      targetTag: targetTag,
      relativeTags: relativeTags
    };
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

.canvas {
  border: 1px solid #000;
}
</style>
