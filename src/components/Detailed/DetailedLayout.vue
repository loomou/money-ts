<template>
  <div class="nav-wrapper">
    <Titles/>
    <Header @showTypeSelect="showTs"/>
    <div class="content">
      <slot></slot>
    </div>
    <Navs/>
  </div>
</template>

<script>
  import Header from "./Header.vue";

  export default {
    name: "DetailedLayout",
    components: {
      Header,
    },
    methods: {
      showTs(e) {
        this.$emit('isTypeSelect', e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/style/helper.scss";

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
