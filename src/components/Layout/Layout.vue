<template>
  <div class="nav-wrapper">
    <Titles/>
    <div class="content">
      <slot></slot>
    </div>
    <Navs/>
  </div>
</template>

<script>
  export default {
    name: "Layout",
  };
</script>

<style lang="scss" scoped>
  .nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    overflow: auto;
    flex-grow: 1;
    background: rgb(236, 236, 236);
  }
</style>
