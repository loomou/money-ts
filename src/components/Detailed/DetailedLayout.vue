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

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Header from './Header.vue';

  @Component({
    components: {Header},
  })
  export default class DetailedLayout extends Vue {
    showTs(e: boolean) {
      this.$emit('isTypeSelect', e);
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
