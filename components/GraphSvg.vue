<template>
  <div>
    <svg viewbox="0 0 1000 1000" :width="width" :height="height">
      <circle @click="linkToList" :r="r" :cx="x" :cy="y" ></circle>
      <text x="500" y="500" text-anchor = "middle" dominant-baseline = "central"
         style="font-size:20px; fill: #513e35;">
         <tspan :x="x" :y="y - 10">{{ name }}</tspan>
         <tspan :x="x" :y="y + 10">の沼を見る？?</tspan>
      </text>
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
      r: 100,
      x: this.width,
      y: this.height,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    console.log("******:")
    console.log(this.width)
    console.log("******:")
    this.x = this.width/2
    this.y = this.height/2
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    linkToList() {
      this.$router.push('/'+this.targetNode.id+'/list')
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
