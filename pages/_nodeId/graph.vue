<template>
  <div>
    <GraphSvg :targetNode="targetTag" :relativeNodes="relativeTags" :name="name" :randomTags="randomTags"
      :vbX="viewBoxX" :vbY="viewBoxY" :vbWidth="viewBoxWidth" :vbHeight="viewBoxHeight" />
  </div>
</template>

<script>
  export default {
    async asyncData({ params, $getTag, $getRelativeTags, $getRandomTags }) {
      const targetTag = await $getTag(params.nodeId);
      const relativeTags = await $getRelativeTags(targetTag.id);
      const minAllTags = 12;
      const minRandomTags = 3;
      const randomTags = await $getRandomTags(
        relativeTags.length <= minAllTags - minRandomTags ? minAllTags - relativeTags.length : minRandomTags,
        relativeTags.concat([targetTag]).map(tag => tag.id)
      );
      return {
        name: targetTag.name,
        targetTag: targetTag,
        relativeTags: relativeTags,
        randomTags: randomTags
      };
    },
    data() {
      return {
        viewBoxX: null,
        viewBoxY: null,
        viewBoxWidth: null,
        viewBoxHeight: null
      };
    },

    async created() {
      const fromTagId = this.$route.query.from;
      this.viewBoxX = Number(this.$route.query.viewBoxX)
        ? Number(this.$route.query.viewBoxX)
        : -window.innerWidth / 2;
      this.viewBoxY = Number(this.$route.query.viewBoxY)
        ? Number(this.$route.query.viewBoxY)
        : -window.innerHeight / 2;
      this.viewBoxWidth = Number(this.$route.query.viewBoxWidth)
        ? Number(this.$route.query.viewBoxWidth)
        : window.innerWidth * 2;
      this.viewBoxHeight = Number(this.$route.query.viewBoxHeight)
        ? Number(this.$route.query.viewBoxHeight)
        : window.innerHeight * 2;
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