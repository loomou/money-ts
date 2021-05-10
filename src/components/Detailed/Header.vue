<template>
  <section class="header-bar">
    <section class="type-box">
      <span class="type-text" @click="showTags">
        全部类型
      </span>
      <svg class="icon icon-vertical">
        <use xlink:href="#icon-vertical"></use>
      </svg>
      <svg class="icon icon-type">
        <use xlink:href="#icon-type"></use>
      </svg>
    </section>
    <section class="date-pay">
      <span class="month" @click="showPopup">
        <span class="month-text">{{nnn(this.$store.state.RecordStore.headerDate)}}</span>
        <svg class="icon icon-down-arrow">
          <use xlink:href="#icon-down-arrow"></use>
        </svg>
      </span>
      <span class="pay">总支出￥{{total.qqq.toFixed(2)}}</span>
      <span class="income">总收入￥{{total.www.toFixed(2)}}</span>
    </section>
    <van-popup v-model="show" position="bottom">
      <div class="date-wrapper">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择时间"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="show = false"
          @confirm="confirmPicker"
          :formatter="formatter"
          item-height="30"
        />
      </div>
    </van-popup>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from "dayjs";

  @Component
  export default class Header extends Vue{
    show: boolean = false
    currentDate: Date = new Date()
    minDate: Date = new Date(2010, 1, 1)
    maxDate: Date = new Date()
    year: Date | string = this.currentMonth

    get total() {
      return this.$store.getters['RecordStore/monthTotal'];
    }

    get currentMonth() {
      return this.$store.state.RecordStore.filterDate;
    }

    showPopup() {
      this.show = true;
    }

    formatter(type:string, val: Date) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    }

    confirmPicker(val:Date) {
      this.$store.commit('RecordStore/queryMonth', val)
      this.show = false;
    }

    showTags() {
      this.$emit('showTypeSelect', true)
    }

    nnn(date:string) {
      return dayjs(date).format('YYYY年M月');
    }
  };
</script>

<style lang="scss" scoped>
  .header-bar {
    padding: 0 12px;
    background: rgb(9, 114, 231);
    color: rgba(246, 246, 246, 0.9);

    .type-box {
      display: inline-block;
      margin-top: 26px;
      padding: 5px 10px;
      color: rgba(246, 246, 246, 0.9);
      background: rgba(243, 242, 242, 0.15);
      border: none;
      outline: none;
      border-radius: 4px;
      font-size: 14px;

    }
  }

  .date-pay {
    padding-top: 2px;
    font-weight: 300;
    font-size: 12px;

    .month {
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 8px 16px;
      color: rgb(237, 245, 237);
      border: none;
      outline: none;
      background: none;

      .month-text {
        margin-right: 6px;
      }

      .icon {
        fill: rgba(243, 242, 242, 0.6);
      }
    }

    .pay {
      margin-right: 12px;
    }
  }
</style>
