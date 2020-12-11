<template>
  <div>
    <nuxt-link to="/">トップへ戻る</nuxt-link>
    <GraphSvg
      :targetNode="targetTag"
      :relativeNodes="relativeTags"
      :name="name"
      :randomTags="randomTags"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $getTag, $getRelativeTags, $getRandomTags }) {
    const targetTag =  await $getTag(params.nodeId);
    const relativeTags = await $getRelativeTags(targetTag.id);
    const randomTags = await $getRandomTags(2);
    return {
      name: targetTag.name,
      targetTag: targetTag,
      relativeTags: relativeTags,
      randomTags: randomTags
    };
  },

  async created() {
    const fromTagId = this.$route.query.from;
    if (fromTagId) {
      const fromTag = await this.$getTag(fromTagId);
      await this.$incrementRelevance(fromTag, this.targetTag);
    }
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
