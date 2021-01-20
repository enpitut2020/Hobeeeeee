<template>
  <div>
    <div>
      <svg :viewBox="
        viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight
      " :width="width" :height="height">
        <g id="scene">
          <!-- 関連趣味に関する描画のループ -->
          <g v-for="(nodes, tierIndex) in scatteredNodes" :key="'t-' + tierIndex">
            <g v-for="(node, nodeIndex) in nodes" :key="'n-' + nodeIndex">
              <!-- ノード間をつなぐ線 -->
              <line :x1="x" :y1="y" :x2="
                x +
                nodeParam.DISTANCE *
                  reverseIndex(tierIndex) *
                  Math.cos(
                    radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                  )
              " :y2="
                y +
                nodeParam.DISTANCE *
                  reverseIndex(tierIndex) *
                  Math.sin(
                    radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                  )
              " stroke="#eaffd0" :stroke-width="`${node.strokeWidth}px`" />
              <nuxt-link :to="
                '/' +
                node.id +
                '/graph?from=' +
                targetNode.id +
                '&viewBoxX=' +
                viewBoxX +
                '&viewBoxY=' +
                viewBoxY +
                '&viewBoxWidth=' +
                viewBoxWidth +
                '&viewBoxHeight=' +
                viewBoxHeight
              " class="node-link">
                <!-- 関連趣味のノード -->
                <circle :r="node.radius" :cx="
                  x +
                  nodeParam.DISTANCE *
                    reverseIndex(tierIndex) *
                    Math.cos(
                      radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                    )
                " :cy="
                  y +
                  nodeParam.DISTANCE *
                    reverseIndex(tierIndex) *
                    Math.sin(
                      radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                    )
                " :class="{ 'random-tags': node.isRandom }"></circle>
                <text :x="x + (nodeIndex + 1) * 200" :y="y + (nodeIndex + 1) * 200" text-anchor="middle"
                  dominant-baseline="central" style="font-size: 24px; fill: #111111">
                  <!-- 関連趣味名 .randomTags -->
                  <tspan :x="
                    x +
                    nodeParam.DISTANCE *
                      reverseIndex(tierIndex) *
                      Math.cos(
                        radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                      )
                  " :y="
                    y +
                    nodeParam.DISTANCE *
                      reverseIndex(tierIndex) *
                      Math.sin(
                        radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                      )
                  ">
                    {{ node.name }}
                  </tspan>
                </text>
              </nuxt-link>
            </g>
          </g>
          <!-- 現在フォーカスしている趣味のノードと名前の描画 -->
          <nuxt-link :to="'/' + targetNode.id + '/list'" class="node-link">
            <circle :r="nodeParam.RADIUS" :cx="x" :cy="y" class="node-link target-tag"></circle>
            <text text-anchor="middle" dominant-baseline="central" style="font-size: 24px; fill: #111111">
              <tspan :x="x" :y="y - nodeParam.TEXT_SHIFT_HEIGHT">
                {{ name }}
              </tspan>
              <tspan :x="x" :y="y + nodeParam.TEXT_SHIFT_HEIGHT">
                の沼を覗く？
              </tspan>
            </text>
          </nuxt-link>
        </g>
      </svg>
    </div>
    <div class="card legend">
      <p class="is-size-5">グラフの見方</p>
      <div class="content">
        <div class=" level block-list">
          <div class="level-item has-text-left">
            <p><svg class="color-sample" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" class="target-tag" />
              </svg> 今見ているタグ
            </p>
          </div>
          <div class="level-item has-text-left">
            <p><svg class="color-sample" viewBox="0 0 100 100">
                <circle class="relative-tags" cx="50" cy="50" r="50" />
              </svg> 関連があるタグ</p>
          </div>
          <div class="level-item has-text-left">
            <p><svg class="color-sample" viewBox="0 0 100 100">
                <circle class=" random-tags" cx="50" cy="50" r="50" />
              </svg> 関連がないタグ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import graphParameters from "@/consts/graphParameters";

  export default {
    props: {
      targetNode: { type: Object, default: new Object() },
      relativeNodes: { type: Array, default: new Array() },
      name: { type: String, default: "" },
      randomTags: { type: Array, default: new Array() },
      vbX: { type: Number, default: 0 },
      vbY: { type: Number, default: -200 },
      vbWidth: { type: Number, default: window.innerWidth },
      vbHeight: { type: Number, default: window.innerHeight },
    },
    data() {
      return {
        active: false,
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0,
        viewBoxX: 0,
        viewBoxY: -200,
        viewBoxWidth: 1500,
        viewBoxHeight: 1500,
        scatteredNodes: null,
      };
    },
    computed: {
      // 定数を取り出す算出プロパティ
      nodeParam() {
        return graphParameters;
      },
    },
    async created() {
      this.viewBoxX = this.vbX;
      this.viewBoxY = this.vbY;
      this.viewBoxWidth = this.vbWidth;
      this.viewBoxHeight = this.vbHeight;
      let _randomTags = this.randomTags.map((randomTag) => {
        randomTag["isRandom"] = true;
        randomTag["relavance"] = 1;
        return randomTag;
      });
      // console.debug("converted randomtags" + JSON.stringify(this.randomTags));
      // relative randomをconcatしたい
      let _relativeNodes = this.relativeNodes.concat(_randomTags);
      _relativeNodes = await this.calcRadius(_relativeNodes);
      _relativeNodes = await this.calcStrokeWidth(_relativeNodes);
      this.scatteredNodes = this.scatterNodes(_relativeNodes);
    },
    mounted() {
      this.x = this.width / 2;
      this.y = this.height / 2;
      var panzoom = require("panzoom");
      var element = document.getElementById("scene");
      panzoom(element, {
        onTouch: function () {
          return false; // tells the library to not preventDefault.
        },
      });
    },
    methods: {
      // 関連を表す線の太さを計算する
      calcStrokeWidth: async function (nodes) {
        const max = Math.max(...nodes.map((node) => node.relevance));
        const min = Math.min(...nodes.map((node) => node.relevance));
        // FIXME: ランダムなタグが関連度nullなので、nullの場合を考慮しないと線の太さがnullになる
        // FIXME: 非同期処理する必要ないかも
        const _nodes = await Promise.all(
          nodes.map(async (node) => {
            const ratio = max === min ? 0 : (node.relevance - min) / (max - min);
            node.strokeWidth =
              this.nodeParam.LINE_WEIGHT +
              this.nodeParam.LINE_WEIGHT *
              this.nodeParam.MAX_STROKE_WIDTH_RATIO *
              ratio;
            return node;
          })
        );
        return _nodes;
      },
      // タグのボリュームを計算する
      // FIXME: ずぶずぶ数など他のプロパティを考慮した計算式にする
      volume: function (tag) {
        return tag.articlesCount ? tag.articlesCount : 0;
      },
      // 全関連ノードの描画時の半径を計算する
      calcRadius: async function (nodes) {
        // tagドキュメントを全て取得
        const allTags = await this.$getTags();
        // volumeの最大・最小値を計算
        const max = Math.max(...allTags.map((tag) => this.volume(tag)));
        const min = Math.min(...allTags.map((tag) => this.volume(tag)));
        // 各ノードについて半径を計算する
        const _nodes = await Promise.all(
          nodes.map(async (node) => {
            const tag = await this.$getTag(node.id);
            // min-max正規化
            let increaseRatio =
              max === min ? 0 : (this.volume(tag) - min) / (max - min);
            // volumeに応じて半径を計算
            node.radius =
              this.nodeParam.RADIUS +
              this.nodeParam.MAX_DELTA_RADIUS * increaseRatio;
            return node;
          })
        );
        return _nodes;
      },
      // ノードを同心円上に配置するときの配置数を返すジェネレータ
      nodeNumGenerator: function* (totalNum) {
        let remainingCount = totalNum;
        //for (let i = 1; i <= this.nodeParam.MAX_RELATIVE_NODE_CIRCLES; i++) {
        for (let i = 1; i <= 10; i++) {
          // 内側の円から4, 8, ...と個数が増えていく
          const nextNum = i * 4;
          if (nextNum >= remainingCount) {
            // 4の倍数ずつ内側から配置していったときの余りを一番外側の円に配置する
            return remainingCount;
          }
          remainingCount -= nextNum;
          yield nextNum;
        }
      },
      // 関連ノードを分割して、ノードの2次元配列にする
      // e.g. scatterNodes({ノード} * 13) -> {[ノード} * 4, ノード * 8, ノード * 1]
      scatterNodes: function (nodes) {
        let copyOfNodes = JSON.parse(JSON.stringify(nodes));
        // 関連度順に降順ソート
        copyOfNodes.sort((a, b) => b.relevance - a.relevance);
        // 4, 8, ...という数字を返すジェネレータ
        const gen = this.nodeNumGenerator(nodes.length);
        // 分割後のノードの配列
        let _scatteredNodes = [];
        let isFinished = false;
        for (let nodeNum = gen.next(); !isFinished; nodeNum = gen.next()) {
          // e.g.
          // (value, done)
          // (4, false)
          // (8, false)
          // (1, true)
          // (null, null)

          // nodeNum.valueの数だけ配列に格納する
          _scatteredNodes.push(copyOfNodes.splice(0, nodeNum.value));
          // 上の例だと(1, true)が返ってきたらループを抜ける
          isFinished = nodeNum.done;
        }
        // 外側に配置するノードから順にソートする
        return _scatteredNodes.reverse();
      },
      // ノード数を考慮した角度を決める
      radOfNode(nodeIndex, tierIndex, nodes) {
        return (
          (2 * Math.PI * nodeIndex + this.nodeParam.ROTATE_RADIAN * tierIndex) /
          nodes.length
        );
      },
      // インデックスを逆順にする
      reverseIndex(index) {
        return this.scatteredNodes.length - index;
        // return 1,2,3,...
      },
    },
  };
</script>

<style>
  /* 円のスタイル設定 */
  circle {
    fill: #67d5b5;
    transition: all 0.4s cubic-bezier(0.96, 0.04, 0.04, 0.96);
    stroke: #111010;
    stroke-width: 0px;
  }

  .random-tags {
    fill: #fce38a;
  }

  .relative-tags {
    fill: #67d5b5;

  }

  .target-tag {
    fill: #f38181;
  }

  .legend {
    padding: 1em;
    position: fixed;
    bottom: 2em;
    left: 2em;
  }

  .color-sample {
    vertical-align: middle;
    width: 1em;
    height: 1em;
  }

  .level-item{
    margin-right:2em;
  }
</style>