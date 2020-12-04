<template>
  <div>
    <svg viewbox="0 0 1000 1000" :width="width" :height="height">
      <g v-for="(node, index) in relativeNodes" :key="index">
        <line
          :x1="x"
          :y1="y"
          :x2="x + 250 * Math.cos((2 * Math.PI * index) / relativeNodes.length)"
          :y2="y + 250 * Math.sin((2 * Math.PI * index) / relativeNodes.length)"
          stroke="#e74c3c"
        />
        <nuxt-link :to="'/' + node.id + '/graph'">
          <circle
            :r="r"
            :cx="
              x + 250 * Math.cos((2 * Math.PI * index) / relativeNodes.length)
            "
            :cy="
              y + 250 * Math.sin((2 * Math.PI * index) / relativeNodes.length)
            "
          ></circle>
          <text
            :x="x + (index + 1) * 200"
            :y="y + (index + 1) * 200"
            text-anchor="middle"
            dominant-baseline="central"
            style="font-size:24px; fill: #513e35;"
          >
            <tspan
              :x="
                x + 250 * Math.cos((2 * Math.PI * index) / relativeNodes.length)
              "
              :y="
                y + 250 * Math.sin((2 * Math.PI * index) / relativeNodes.length)
              "
            >
              {{ node.name }}
            </tspan>
          </text>
        </nuxt-link>
      </g>
       <nuxt-link :to="'/' + targetNode.id + '/list'">
        <circle :r="r" :cx="x" :cy="y"></circle>
        <text
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size:24px; fill: #513e35;"
        >
          <tspan :x="x" :y="y - 10">{{ name }}</tspan>
          <tspan :x="x" :y="y + 15">の沼を見る？</tspan>
        </text>
      </nuxt-link>
    </svg>
  </div>
</template>

<script>
export default {
  props: ["targetNode", "relativeNodes", "name"],
  data() {
    return {
      active: false,
      width: window.innerWidth,
      height: window.innerHeight,
      // 円のサイズ指定をcircle.r的な書き方にしたいんだけどやり方分からなかったやつ↓
      r: 100, // magic num: 後々規模感で変わる可能性あり
      x: 0,
      y: 0
    };
  },
  computed: {
    yi: function(deltaY) {
      return this.y + deltaY;
    }
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
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.x = this.width / 5;
      this.y = this.height / 5;
    }
  }
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
