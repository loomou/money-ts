<template>
  <div class="add-button">
    <svg class="icon">
      <use xlink:href="#icon-record"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "addition",
  };
</script>

<style lang="scss" scoped>
  .add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    .icon {
      width: 26px;
      height: 26px;
      fill: rgb(9, 114, 231);
    }
  }
</style>
