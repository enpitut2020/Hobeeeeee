<template>
    <div>
    <h1>{{this.article.title}}</h1>
    <p>{{this.article.contents}}</p>

    </div>
</template>

<script>
export default {
    props:["article"]
    
}
</script>