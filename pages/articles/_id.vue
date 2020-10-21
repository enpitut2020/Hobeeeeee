<template>
<div class="container">
    <div class="my-title-container">
        <h1 class="my-title">記事詳細：{{title}}</h1>
        <h2 class="my-tag">タグ: {{tag}}</h2>
    </div>
    <div class="content">{{content}}</div>
    <!-- <p>{{$route.params.id}}</p>  -->
    <nuxt-link to="../articles/">記事一覧へ戻る</nuxt-link>
    <button class="zbzb-btn" v-on:click="zbzb_count += 1">{{zbzb_count}} ずぶずぶ！</button>
</div>

</template>

<script>
export default {
  data() {
      return{
          title:"ボルダリングはいいぞ(静的データ）",
          tag:"ボルダリング",
          content: "初期データ",
          zbzb_count: 64
      }
  },

  created(){
      this.title="createdで書き換え",
      this.content = this.$articlesData[this.$route.params.id].content
  }
  }

</script>
<style>
    .my-title-container{
        margin: 20px 0px;
    }
    .my-title{
        border: 1px solid black;
        height: 100px;
    }
    .my-tag{
        border: 1px solid black;
        height: 30px;
    }
    .content{
        border: 1px solid black;
        height: 400px;
    }
    .zbzb-btn{

    }
</style>