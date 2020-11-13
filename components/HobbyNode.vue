<template>
  <div class="node_div">
    <nuxt-link :to="'/' + node.id + '/graph/'"
      >関連の趣味 {{ node.title }}
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["node"],
};
</script>

<style>
  .node_div{
    width: 33vw;
    height: 33vw;
    border-radius: 50%;
    /* border: solid 5px rgb(63, 210, 71, .3); */
    border: solid 5px #00a896b3;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: rgb(63, 192, 71, .3); */
    background-color: #02c39a4d;
  }
</style>