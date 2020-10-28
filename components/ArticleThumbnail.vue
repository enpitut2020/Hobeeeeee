<template>
<!--TODO:リンクを追加-->
<div>
      {{ article.title }}
    {{ article.creatorName }}
    {{ article.zbzb }}</div>
</template>

<script>
export default {
props:["article"]
}
</script>

<style>

</style>