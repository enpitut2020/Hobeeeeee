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
    const targetTag = await $getTag(params.nodeId);
    const relativeTags = await $getRelativeTags(targetTag.id);
    const randomTags = await $getRandomTags(
      2,
      relativeTags.concat([targetTag]).map((tag) => tag.id)
    );
    // TODO: 表示するノードを制限する
    // 同心円は複数用意する
    // 関連度のあるやつ: 内側から順に並べていく、外に行くに連れて関連度(低)、個数(多)
    // 内側から4, 8, 16, ...個みたいに
    // 関連度のないやつ: 2個、円状に並べない
    return {
      name: targetTag.name,
      targetTag: targetTag,
      relativeTags: relativeTags,
      randomTags: randomTags,
    };
  },

  async created() {
    const fromTagId = this.$route.query.from;
    if (fromTagId) {
      const fromTag = await this.$getTag(fromTagId);
      await this.$incrementRelevance(fromTag, this.targetTag);
    }
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

.canvas {
  border: 1px solid #000;
}
</style>
