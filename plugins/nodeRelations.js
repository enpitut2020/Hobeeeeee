import Vue from 'vue'

Vue.prototype.$nodeRelations = {
  1: {
    id: 1,
    title: "スポーツ",
    relativeId: [2, 10],
    volume: 8
  },
  2: {
    id: 2,
    title: "ファッション",
    relativeId: [1, 4, 7, 11, 12],
    volume: 1
  },
  3: {
    id: 3,
    title: "ゲーム",
    relativeId: [4],
    volume: 5
  },
  4: {
    id: 4,
    title: "メディア",
    relativeId: [2, 3, 5, 11],
    volume: 7
  },
  5: {
    id: 5,
    title: "料理",
    relativeId: [4, 6, 11],
    volume: 3
  },
  6: {
    id: 6,
    title: "PC・プログラミング",
    relativeId: [5, 7, 9],
    volume: 2
  },
  7: {
    id: 7,
    title: "ガジェット",
    relativeId: [6, 8, 2],
    volume: 2
  },
  8: {
    id: 8,
    title: "語学",
    relativeId: [7, 9, 12],
    volume: 2
  },
  9: {
    id: 9,
    title: "イベント",
    relativeId: [6, 8, 10],
    volume: 2
  },
  10: {
    id: 10,
    title: "アウトドア",
    relativeId: [1, 9],
    volume: 7
  },
  11: {
    id: 11,
    title: "写真",
    relativeId: [2, 4, 5],
    volume: 2
  },
  12: {
    id: 12,
    title: "その他",
    relativeId: [2, 8],
    volume: 2
  }
}