<template>
  <div>
    <svg viewbox="0 0 1000 1000" :width="width" :height="height">
      <!-- 関連趣味に関する描画のループ -->
      <g v-for="(node, index) in relativeNodes" :key="index">
        <!-- ノード間をつなぐ線 -->
        <line
          :x1="x"
          :y1="y"
          :x2="
            x +
            nodeParam.DISTANCE *
              Math.cos((2 * Math.PI * index) / relativeNodes.length)
          "
          :y2="
            y +
            nodeParam.DISTANCE *
              Math.sin((2 * Math.PI * index) / relativeNodes.length)
          "
          stroke="#333333"
          :stroke-width="`${strokeWidth(node)}px`"
        />
        <nuxt-link :to="'/' + node.id + '/graph?from=' + targetNode.id">
          <!-- 関連趣味のノード -->
          <circle
            :r="nodeParam.RADIUS"
            :cx="
              x +
              nodeParam.DISTANCE *
                Math.cos((2 * Math.PI * index) / relativeNodes.length)
            "
            :cy="
              y +
              nodeParam.DISTANCE *
                Math.sin((2 * Math.PI * index) / relativeNodes.length)
            "
          ></circle>
          <text
            :x="x + (index + 1) * 200"
            :y="y + (index + 1) * 200"
            text-anchor="middle"
            dominant-baseline="central"
            style="font-size: 24px; fill: #513e35"
          >
            <!-- 関連趣味名 -->
            <tspan
              :x="
                x +
                nodeParam.DISTANCE *
                  Math.cos((2 * Math.PI * index) / relativeNodes.length)
              "
              :y="
                y +
                nodeParam.DISTANCE *
                  Math.sin((2 * Math.PI * index) / relativeNodes.length)
              "
            >
              {{ node.name }}
            </tspan>
          </text>
        </nuxt-link>
      </g>
      <!-- 現在フォーカスしている趣味のノードと名前の描画 -->
      <nuxt-link :to="'/' + targetNode.id + '/list'">
        <circle :r="nodeParam.RADIUS" :cx="x" :cy="y"></circle>
        <text
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size: 24px; fill: #513e35"
        >
          <tspan :x="x" :y="y - nodeParam.TEXT_SHIFT_HEIGHT">{{ name }}</tspan>
          <tspan :x="x" :y="y + nodeParam.TEXT_SHIFT_HEIGHT">
            の沼を見る？
          </tspan>
        </text>
      </nuxt-link>
    </svg>
  </div>
</template>

<script>
import graphParameters from "@/consts/graphParameters";

export default {
  props: ["targetNode", "relativeNodes", "name"],
  data() {
    return {
      active: false,
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
    };
  },
  computed: {
    yi: function (deltaY) {
      return this.y + deltaY;
    },
    nodeParam() {
      return graphParameters;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    console.log("******:");
    console.log(this.relativeNodes);
    console.log("******:");
    this.x = this.width / 2;
    this.y = this.height / 2;
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: function () {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.x = this.width / 5;
      this.y = this.height / 5;
    },
    strokeWidth: function (target) {
      let max = Math.max(...this.relativeNodes.map((node) => node.relevance));
      let min = Math.min(...this.relativeNodes.map((node) => node.relevance));
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
  },
};
</script>

<style>
/* 円のスタイル設定 */
circle {
  fill: #67d5b5;
  transition: all 0.4s cubic-bezier(0.96, 0.04, 0.04, 0.96);
  stroke: #513e35;
  stroke-width: 0px;
}
</style>
