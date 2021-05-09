<template>
  <header class="title-bar">
    <p class="title">记账本</p>
  </header>
</template>

<script>
  export default {
    name: "titles"
  };
</script>

<style lang="scss" scoped>
  .title-bar {
    padding: 15px 14px;
    width: 100%;
    height: 50px;
    background: rgb(9, 114, 231);
    font-size: 20px;
    color: #fff;

    .title {
      text-align: center;
    }
  }
</style>
