<template>
  <div>
    <!--
    <form>
      <span>中心座標=({{ x }},{{ y }})</span>
      <span>マウス座標=({{ mouseX }}, {{ mouseY }})</span>
      <label> x</label> <input v-model="viewBoxX" type="number" step="10" />
      <label> y </label><input v-model="viewBoxY" type="number" step="10" />
      <label> width</label>
      <input v-model="viewBoxWidth" type="number" step="10" min="0" />
      <label> height</label>
      <input v-model="viewBoxHeight" type="number" step="10" min="0" />
    </form>
    -->
    <svg
      :viewBox="
        viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight
      "
      :width="width"
      :height="height"
      @mousedown="touchstart($event)"
      @mousemove="touchmove($event)"
      @mouseup="touchend($event)"
      @mouseleave="touchend($event)"
      @wheel="mouseWheel($event)"
    >
      <!-- 関連趣味に関する描画のループ -->
      <g v-for="(nodes, tierIndex) in scatteredNodes" :key="'t-' + tierIndex">
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
            :stroke-width="`${node.strokeWidth}px`"
          />
          <nuxt-link
            :to="
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
            "
          >
            <!-- 関連趣味のノード -->
            <circle
              :r="node.radius"
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
              :class="{ randomTags: node.isRandom }"
            ></circle>
            <text
              :x="x + (nodeIndex + 1) * 200"
              :y="y + (nodeIndex + 1) * 200"
              text-anchor="middle"
              dominant-baseline="central"
              style="font-size: 24px; fill: #111111"
            >
              <!-- 関連趣味名 .randomTags -->
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
            の沼を覗く？
          </tspan>
        </text>
      </nuxt-link>
    </svg>
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
      isMousedown: false,
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      viewBoxX: 0,
      viewBoxY: -200,
      viewBoxWidth: 1500,
      viewBoxHeight: 1500,
      scatteredNodes: null,
      mouseX: 0,
      mouseY: 0,
      prev_pos: {
        x: 0,
        y: 0,
      },
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
    window.addEventListener("resize", this.handleResize);
    let _randomTags = this.randomTags.map((randomTag) => {
      randomTag["isRandom"] = true;
      randomTag["relavance"] = 1;
      return randomTag;
    });
    // console.debug("converted randomtags" + JSON.stringify(this.randomTags));
    // relative randomをconcatしたい
    let _relativeNodes = this.relativeNodes.concat(_randomTags);
    console.debug(`relativeNodes: ${JSON.stringify(_relativeNodes)}`);
    _relativeNodes = await this.calcRadius(_relativeNodes);
    console.debug(`relativeNodes: ${JSON.stringify(_relativeNodes)}`);
    _relativeNodes = await this.calcStrokeWidth(_relativeNodes);
    console.debug(`relativeNodes: ${JSON.stringify(_relativeNodes)}`);
    this.scatteredNodes = this.scatterNodes(_relativeNodes);
    console.debug(`relativeNodes: ${JSON.stringify(_relativeNodes)}`);
    this.noScroll();
  },
  mounted() {
    this.x = this.width / 2;
    this.y = this.height / 2;
    window.resizeTo(5000, 5000);
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("wheel", this.scrollControl, { passive: false });
    window.removeEventListener("touchmove", this.scrollControl, {
      passive: false,
    });
    window.removeEventListener("keydown", this.scrollControl, {
      passive: false,
    });
  },
  methods: {
    clickEvent(event) {
      console.log(`Clicked (${event.clientX}, ${event.clientY})`);
    },
    touchstart: function (event) {
      this.isMousedown = true;
      console.log("touch start:%d,%d", event.offsetX, event.offsetY);
      this.prev_pos.x = event.offsetX;
      this.prev_pos.y = event.offsetY;
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    },
    touchmove: function (event) {
      // 押下中だったら
      if (this.isMousedown) {
        // 前回座標との差分を算出
        let moved_x = event.offsetX - this.prev_pos.x;
        let moved_y = event.offsetY - this.prev_pos.y;

        // 全要素に差分を適用
        this.viewBoxX -= moved_x;
        this.viewBoxY -= moved_y;

        // 前回のクリック座標を更新
        this.prev_pos.x = event.offsetX;
        this.prev_pos.y = event.offsetY;
      }
    },
    touchend: function () {
      this.isMousedown = false;
      console.log("touch end");
    },
    mouseWheel: function (event) {
      console.log(`mouse wheel ${event.deltaMode}`);
      if (event.deltaY > 0) {
        // zoom in
        this.viewBoxWidth = (this.viewBoxWidth * (500 - event.deltaY)) / 500;
        this.viewBoxHeight = (this.viewBoxHeight * (500 - event.deltaY)) / 500;
      } else {
        // zoom out
        this.viewBoxWidth = (this.viewBoxWidth * (500 - event.deltaY)) / 500;
        this.viewBoxHeight = (this.viewBoxHeight * (500 - event.deltaY)) / 500;
      }
    },
    scrollControl: function (event) {
      event.preventDefault();
    },
    noScroll: function () {
      window.addEventListener("wheel", this.scrollControl, { passive: false });
      window.addEventListener("touchmove", this.scrollControl, {
        passive: false,
      });
      window.addEventListener("keydown", this.scrollControl, {
        passive: false,
      });
    },
    handleResize: function () {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.x = this.width / 2;
      this.y = this.height / 2;
    },
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
    // 全関連ノードの描画時の半径を計算する
    calcRadius: async function (nodes) {
      // tagドキュメントを全て取得
      const allTags = await this.$getTags();
      // volumeの最大・最小値を計算
      const max = Math.max(...allTags.map((tag) => tag.volume));
      const min = Math.min(...allTags.map((tag) => tag.volume));
      // 各ノードについて半径を計算する
      const _nodes = await Promise.all(
        nodes.map(async (node) => {
          const tag = await this.$getTag(node.id);
          // min-max正規化
          let increaseRatio =
            max === min ? 0 : (tag.volume - min) / (max - min);
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
      const gen = this.nodeNumGenerator(nodes.length);
      let _scatteredNodes = [];
      while (true) {
        let nodeNum = gen.next();
        // console.debug("nodeNum : " + nodeNum.value);
        _scatteredNodes.push(copyOfNodes.splice(0, nodeNum.value));
        if (nodeNum.done) {
          // 最後のノード数を返すときにdoneプロパティがtrueになるのでそこで終了
          break;
        }
      }
      console.debug(
        `Splitted relativeNodes (created() in GraphSvg.vue): ${JSON.stringify(
          _scatteredNodes
        )}`
      );
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

.randomTags {
  fill: #fce38a;
}
</style>
