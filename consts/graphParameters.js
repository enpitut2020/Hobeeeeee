export default {
  // ノードの半径
  "RADIUS": 100,
  // ノードと1つ外側のノードの間の距離
  "DISTANCE": 250,
  // ターゲットノードに表示する2行の文字列の中心からのずらし幅
  "TEXT_SHIFT_HEIGHT": 15,
  // ノード間をつなぐ線の幅
  "LINE_WEIGHT": 10,
  // ノード間をつなぐ線の幅が最大でLINE_WEIGHTの何倍まで太くなるか
  // (MAX_STROKE_WIDTH_RATIO + 1)倍まで太くなる
  "MAX_STROKE_WIDTH_RATIO": 5,
  // 関連ノードの同心円を表示する個数
  "MAX_RELATIVE_NODE_CIRCLES": 10,
  // 回転する幅
  "ROTATE_RADIAN": Math.PI / 6,
  // ノードの半径の増加分の最大値
  "MAX_DELTA_RADIUS": 100,
}
