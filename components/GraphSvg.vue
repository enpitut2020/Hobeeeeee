<template>
  <div width="2000px" :height="height * 3">
    <form>
      <span>中心座標=({{ x }},{{ y }})</span>
      <label> x</label> <input v-model="viewBoxX" type="number" step="10" />
      <label> y </label><input v-model="viewBoxY" type="number" step="10" />
      <label> width</label>
      <input v-model="viewBoxWidth" type="number" step="10" min="0" />
      <label> height</label>
      <input v-model="viewBoxHeight" type="number" step="10" min="0" />
    </form>
    <svg
      :viewBox="
        viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight
      "
      :width="width"
      :height="height"
    >
      <!-- 関連趣味に関する描画のループ -->
      <g
        v-for="(nodes, tierIndex) in splittedRelativeNodes"
        :key="'t-' + tierIndex"
      >
        <g v-for="(node, nodeIndex) in nodes" :key="'n-' + nodeIndex">
          <!-- ノード間をつなぐ線 -->
          <line
            :x1="x"
            :y1="y"
            :x2="
              x +
                nodeParam.DISTANCE *
                  reverseIndex(tierIndex) *
                  Math.cos(
                    radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                  )
            "
            :y2="
              y +
                nodeParam.DISTANCE *
                  reverseIndex(tierIndex) *
                  Math.sin(
                    radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                  )
            "
            stroke="#eaffd0"
            :stroke-width="`${strokeWidth(node)}px`"
          />
          <nuxt-link :to="'/' + node.id + '/graph?from=' + targetNode.id">
            <!-- 関連趣味のノード -->
            <circle
              :r="nodeParam.RADIUS"
              :cx="
                x +
                  nodeParam.DISTANCE *
                    reverseIndex(tierIndex) *
                    Math.cos(
                      radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                    )
              "
              :cy="
                y +
                  nodeParam.DISTANCE *
                    reverseIndex(tierIndex) *
                    Math.sin(
                      radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                    )
              "
            ></circle>
            <text
              :x="x + (nodeIndex + 1) * 200"
              :y="y + (nodeIndex + 1) * 200"
              text-anchor="middle"
              dominant-baseline="central"
              style="font-size: 24px; fill: #111111"
            >
              <!-- 関連趣味名 -->
              <tspan
                :x="
                  x +
                    nodeParam.DISTANCE *
                      reverseIndex(tierIndex) *
                      Math.cos(
                        radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                      )
                "
                :y="
                  y +
                    nodeParam.DISTANCE *
                      reverseIndex(tierIndex) *
                      Math.sin(
                        radOfNode(nodeIndex, reverseIndex(tierIndex) - 1, nodes)
                      )
                "
              >
                {{ node.name }}
              </tspan>
            </text>
          </nuxt-link>
        </g>
      </g>
      <!-- 現在フォーカスしている趣味のノードと名前の描画 -->
      <nuxt-link :to="'/' + targetNode.id + '/list'">
        <circle
          :r="nodeParam.RADIUS"
          :cx="x"
          :cy="y"
          style="fill: #f38181"
        ></circle>
        <text
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size: 24px; fill: #111111"
        >
          <tspan :x="x" :y="y - nodeParam.TEXT_SHIFT_HEIGHT">{{ name }}</tspan>
          <tspan :x="x" :y="y + nodeParam.TEXT_SHIFT_HEIGHT">
            の沼を見る？
          </tspan>
        </text>
      </nuxt-link>
      <!-- ランダムのノード -->
      <g v-for="(node, index) in randomTags" :key="index">
        <nuxt-link :to="'/' + node.id + '/graph?from=' + targetNode.id">
          <circle
            :r="nodeParam.RADIUS"
            :cx="x + (index + 1) * 250"
            :cy="y + 300"
            class="randomTags"
          ></circle>
          <text
            text-anchor="middle"
            dominant-baseline="central"
            style="font-size: 24px; fill: #111111"
          >
            <tspan :x="x + (index + 1) * 250" :y="y + 300">
              {{ node.name }}
            </tspan>
          </text>
        </nuxt-link>
      </g>
    </svg>
  </div>
</template>

<script>
import graphParameters from "@/consts/graphParameters";

export default {
  props: ["targetNode", "relativeNodes", "name", "randomTags"],
  data() {
    return {
      active: false,
      viewBoxX: -100,
      viewBoxY: -1500,
      viewBoxWidth: 10,
      viewBoxHeight: 3000,
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      splittedRelativeNodes: null
    };
  },
  computed: {
    // 定数を取り出す算出プロパティ
    nodeParam() {
      return graphParameters;
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.splittedRelativeNodes = this.splitRelativeNodes(this.relativeNodes);
  },
  mounted() {
    this.x = this.width / 2;
    this.y = this.height / 2;
    window.resizeTo(5000, 5000);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.x = this.width / 2;
      this.y = this.height / 2;
    },
    // 関連を表す線の太さを計算する
    strokeWidth: function(target) {
      let max = Math.max(...this.relativeNodes.map(node => node.relevance));
      let min = Math.min(...this.relativeNodes.map(node => node.relevance));
      let ratio = max === min ? 0 : (target.relevance - min) / (max - min);
      // 関連趣味のrelevanceが[13, 43, 28, 134, 55]、基本の太さが10、最大で5倍まで太くなるとすると
      // (relevance=43の趣味との線の太さ)
      // = 基本の太さ + 最大で何倍の太さを加えるか * 関連趣味の中での相対的な割合
      // = 10 + 最大で何倍の太さを加えるか * 関連趣味の中での相対的な割合
      // = 10 + (10 * 5) * 関連趣味の中での相対的な割合
      // = 10 + (10 * 5) * ((関連度 - 最小値) / (最大値 - 最小値))
      // = 10 + (10 * 5) * ((43 - 13) / (134 - 13))
      // = 10 + 50 * 1/5
      // ≒ 22.4
      // 以上の計算で太さが10〜60の間に収まる
      return (
        this.nodeParam.LINE_WEIGHT +
        this.nodeParam.LINE_WEIGHT *
          this.nodeParam.MAX_STROKE_WIDTH_RATIO *
          ratio
      );
    },
    // ノードを同心円上に配置するときの配置数を返すジェネレータ
    nodeNumGenerator: function*(totalNum) {
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
    // e.g. splitRelativeNodes({ノード} * 13) -> {[ノード} * 4, ノード * 8, ノード * 1]
    splitRelativeNodes: function(nodes) {
      let relativeNodesCopy = JSON.parse(JSON.stringify(nodes));
      // 関連度順に降順ソート
      relativeNodesCopy.sort((a, b) => b.relevance - a.relevance);
      const gen = this.nodeNumGenerator(nodes.length);
      let splittedNodes = [];
      while (true) {
        let nodeNum = gen.next();
        console.debug("nodeNum : " + nodeNum.value);
        splittedNodes.push(relativeNodesCopy.splice(0, nodeNum.value));
        if (nodeNum.done) {
          // 最後のノード数を返すときにdoneプロパティがtrueになるのでそこで終了
          break;
        }
      }
      console.debug(
        `Splitted relativeNodes (created() in GraphSvg.vue): ${JSON.stringify(
          splittedNodes
        )}`
      );
      // 外側に配置するノードから順にソートする
      return splittedNodes.reverse();
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
      return this.splittedRelativeNodes.length - index;
      // return 1,2,3,...
    }
  }
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

.randomTags {
  fill: #fce38a;
}
</style>
