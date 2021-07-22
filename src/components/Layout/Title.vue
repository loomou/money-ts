<template>
  <header class="title-bar">
    <p class="title">记账本</p>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Title extends Vue {
  };
</script>

<style lang="scss" scoped>
  .title-bar {
    padding: 15px 14px;
    width: 100%;
    background: rgb(9, 114, 231);
    font-size: 18px;
    color: #fff;

    .title {
      text-align: center;
    }
  }
</style>
