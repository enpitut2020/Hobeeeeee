<template>
  <canvas ref="graph-canvas" width="1000" height="1000" class="canvas"></canvas>
</template>

<script>
export default {
  props: {
    targetNode: JSON,
    relativeNodes: JSON,
    name: { type: String, default: "" },
  },

  mounted() {
    this.ctx = this.$el.getContext("2d");
    console.debug("this.ctx" + JSON.stringify(this.ctx));
    this.ctx.font = "48px serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.draw(this.articlesCount);
  },
  methods: {
    draw() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, 1000, 1000);
      this.drawCircle(500, 500, 100, "rgba(255,0,0,0.5)", "rgba(255,0,0,1)");
      this.ctx.fillText(this.name, 500, 500);
      //TODO:relativeの描画
    },
    drawCircle(
      x,
      y,
      r = 100,
      fillRGB = "rgba(0,0,0,0)",
      lineRGB = "rgba(0,0,0,0)"
    ) {
      console.debug("円の描画");
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = fillRGB;
      this.ctx.fill();
      this.ctx.strokeStyle = lineRGB; //色指定
      this.ctx.stroke();
    },
    drawLine(x1, y1, x2, y2, RGB, lineWidth = 5) {
      this.ctx.beginPath();
      this.ctx.lineTo(x2, y2); // 終点
      this.ctx.moveTo(x1, y1); // 始点に移動
      this.ctx.strokeStyle = RGB; // 線の色
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke();
    },
  },
};
</script>

<style></style>
