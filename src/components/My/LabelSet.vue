<template>
  <router-link to="/label">
    <div class="label-set">
        <span class="label-title">
          <span class="label-icon">
            <svg class="icon">
              <use xlink:href="#icon-type"></use>
            </svg>
          </span>
          <span>类型设置</span>
        </span>
      <span class="label-arrow">
          <svg class="icon">
              <use xlink:href="#icon-right-arrow"></use>
          </svg>
        </span>
    </div>
  </router-link>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class LabelSet extends Vue {
  };
</script>

<style lang="scss" scoped>
  .label-set {
    width: 100%;
    display: flex;
    margin-top: 10px;
    height: 50px;
    padding: 0 20px;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .label-title {
      display: flex;
      align-items: center;
      align-content: flex-start;

      .label-icon {
        margin-right: 10px;

        .icon {
          fill: rgb(9, 114, 231);
        }
      }
    }

    .label-arrow .icon {
      fill: #b5b5b5;
    }
  }
</style>
