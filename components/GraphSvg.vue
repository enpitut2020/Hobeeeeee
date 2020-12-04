<template>
  <div>
    <svg viewbox="0 0 1000 1000" :width="width" :height="height">
      <a :v-attr="'xlink:href=/'+targetNode.id+'/list'">
      <circle @click="linkToList(targetNode.id)" :r="r" :cx="x" :cy="y" ></circle>
      <text text-anchor = "middle" dominant-baseline = "central"
         style="font-size:20px; fill: #513e35;">
         <tspan :x="x" :y="y-10">{{ name }}</tspan>
         <tspan :x="x" :y="y+10">の沼を見る？</tspan>
      </text>
      </a>
      <g v-for="(node, index) in relativeNodes" :key="index">
      <!-- <a :v-attr="'xlink:href=/'+node.id+'/list'"> -->
        <circle @click="linkToGraph(node.id)" :r="r" :cx="x + (index + 1) * 200" :cy="y + (index + 1) * 200" ></circle>
        <text x="x + (index + 1) * 200" y="y + (index + 1) * 200" text-anchor = "middle" dominant-baseline = "central"
          style="font-size:20px; fill: #513e35;">
          <tspan :x="x + (index + 1) * 200" :y="y + (index + 1) * 200">{{ node.name }}</tspan>
        </text>
      <!-- </a> -->
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ["targetNode","relativeNodes","name"],
  data() {
    return {
      active: false,
      width: window.innerWidth,
      height: window.innerHeight,
      // 円のサイズ指定をcircle.r的な書き方にしたいんだけどやり方分からなかったやつ↓
      r: 100, // magic num: 後々規模感で変わる可能性あり
      x: 0,
      y: 0,
    }
  },
  computed: {
    yi: function (deltaY) {
      return this.y + deltaY;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    console.log("******:")
    console.log(this.relativeNodes)
    console.log("******:")
    this.x = this.width/2
    this.y = this.height/2
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    linkToList(id) {
      this.$router.push('/'+id+'/list')
    },
    linkToGraph(id) {
      this.$router.push('/'+id+'/graph')
    },
    handleResize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.x = this.width/2
      this.y = this.height/2
    }
  },
}
</script>

<style>
/* 円のスタイル設定 */
circle{
  fill: #67D5B5;
  transition: all 0.4s cubic-bezier(.96,.04,.04,.96);
  stroke: #513e35;
  stroke-width: 0px;
}
</style>
