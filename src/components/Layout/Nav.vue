<template>
  <nav class="nav-bar">
    <router-link to="/detailed" class="item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#icon-detailed"></use>
      </svg>
      <div>明细</div>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#icon-statistics"></use>
      </svg>
      <div>统计</div>
    </router-link>
    <router-link to="/my" class="item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#icon-my"></use>
      </svg>
      <div>我的</div>
    </router-link>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Nav extends Vue {
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/style/helper.scss";

  .nav-bar {
    @extend %outerShadow;
    padding: 8px 0;
    font-size: 10px;
    display: flex;
    /*z-index: 2;*/
    background: #f6f6f6;

    > .item {
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .icon {
        width: 26px;
        height: 26px;
        padding: 3px 3px;
      }
    }

    > .item.selected {
      color: rgb(9, 114, 231);

      .icon {
        fill: rgb(9, 114, 231);
      }
    }
  }
</style>
