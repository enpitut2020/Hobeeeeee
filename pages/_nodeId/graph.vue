<template>
  <canvas width="1000" height="1000" class="canvas"></canvas>
  <!-- <div>
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
  </div>-->
</template>

<script>
  //TODO:それをグラフっぽく表示
  //TODO: articlesCountの反映
  //TODO:ないIDのエラーハンドリング
  export default {
    data() {
      return {
        targetNodeName: "",
        articlesCount: 50,
        id: "dSDFgk3jri54s54kSDFd",
        name: "ボルダリング",
        relative: [{ // 関連するタグの配列
          id: "L45OR01sdfsdfIT40",
          name: "山登り",//とりあえず書いてるだけ
          relevance: 60,  // 関連度
          articlesCount: 100,
        },
        {
          id: "L45OR01sdfsdfIT40",
          name: "山登り",//とりあえず書いてるだけ
          relevance: 70,  // 関連度
          articlesCount: 60,
        },
        {
          id: "L45OR01sdfsdfIT40",
          name: "山登り",//とりあえず書いてるだけ
          relevance: 80,  // 関連度
          articlesCount: 10,
        }]
      };
    },
    methods: {
      draw(radius) {
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, 1000, 1000)
        this.drawCircle(500, 500, 50, "rgba(255,0,0,0.1)", "rgba(255,0,0,1)")
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

    created() {
      // this.$getNodesData().then(nodes => {
      //   this.targetNode = nodes.filter(tmp => {
      //     return tmp.id === this.id;
      //   });
      //   this.targetNode=this.targetNode[0]
      //   this.title = this.targetNode.title;
      //   this.relativeNodes = this.targetNode.relativeNodes;
      //   // FIXME: relativeNodesに関連する趣味を追加する
      // });
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