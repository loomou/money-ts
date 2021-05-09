<template>
  <router-link to="/detailed">
    <div class="month-bill-wrapper">
      <div class="bill-header">
          <span class="bill-date">
            2021年4月账单
          </span>
        <span class="bill-icon">
            <svg class="icon">
              <use xlink:href="#icon-right-arrow"></use>
            </svg>
          </span>
      </div>
      <div class="bill">
        <ul>
          <li>收入</li>
          <li class="amount">￥0.00</li>
        </ul>
        <ul>
          <li>支出</li>
          <li class="amount">￥0.00</li>
        </ul>
        <ul>
          <li>结余</li>
          <li class="amount green">￥0.00</li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class MonthDetail extends Vue {
  };
</script>

<style lang="scss" scoped>
  .month-bill-wrapper {
    width: 100%;
    padding: 10px 20px;
    background: #fff;
    margin-top: 10px;
    font-size: 14px;

    .bill-header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .icon {
        fill: #b5b5b5;
      }
    }

    .bill {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      .amount {
        font-weight: 600;
      }

      .green {
        color: #28a745;
      }
    }
  }
</style>
