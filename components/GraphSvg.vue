<template>
  <div>
    <svg viewbox="0 0 1000 1000" width="1000" height="1000">
      <circle @click="linkToList" r="150" cx="500" cy="500" ></circle>
      <text x="500" y="500" text-anchor = "middle" dominant-baseline = "central"
         style="font-size:20px; fill: #513e35;">
         <tspan x="500" y="490">{{ name }}</tspan>
         <tspan x="500" y="510">の沼を見る？</tspan>
        
        <tbreak />
        
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
        r: 80,
        x: 200,
        y: 100,
    };
  },
  methods: {
    linkToList() {
      this.$router.push('/'+this.targetNode.id+'/list')
    }
  },
  mounted() {
    console.log("******:")
    console.log(this.name)
    console.log("******:")
  }
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
