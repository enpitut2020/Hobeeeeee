<template>
<div>
<h1 class="title">記事一覧です</h1>
{{this.articlesData}}
</div>
</template>

<script>
export default {
    data() {
        return{
            articlesData:"afda"
        }
    },
    created(){
        // this.articlesData=this.$articleDatas
    }
}
</script>

<style>
</style>
