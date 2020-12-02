<template>
  <canvas width="1000" height="1000" class="canvas"></canvas>
  <!-- <div>
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
  </div>-->
</template>

<script>
  export default {
    async asyncData({ params, $getTags, $getRelativeTags }) {
      const tags = await $getTags();
      const targetNode = tags.find(tag => tag.id === params.nodeId);
      const name = targetNode.name ?? "グラフ";
      const relativeNodes = await $getRelativeTags(targetNode.id);
      return {
        name,
        targetNode,
        relativeNodes,
      };
    },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      draw(radius) {
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, 1000, 1000)
        this.drawCircle(500, 500, 100, "rgba(255,0,0,0.5)", "rgba(255,0,0,1)")
        this.ctx.fillText(this.name, 500, 500)
        //TODO:relativeの描画
      },
      drawCircle(x, y, r = 100, fillRGB = "rgba(0,0,0,0)", lineRGB = "rgba(0,0,0,0)", lineWidth = 8) {
        console.debug("円の描画")
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, Math.PI * 2)
        this.ctx.fillStyle = fillRGB;
        this.ctx.fill();
        this.ctx.strokeStyle = lineRGB;//色指定
        this.ctx.stroke();
      },
      drawLine(x1, y1, x2, y2, RGB, lineWidth = 5) {
        this.ctx.beginPath()
        this.ctx.lineTo(x2, y2);        // 終点
        this.ctx.moveTo(x1, y1);          // 始点に移動
        this.ctx.strokeStyle = RGB;  // 線の色
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
      },
    },

    mounted() {
      this.ctx = this.$el.getContext('2d')
      this.ctx.font = "48px serif";
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      this.draw(this.articlesCount)
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