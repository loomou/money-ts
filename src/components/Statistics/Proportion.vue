<template>
  <div>
    <ul class="pro-wrapper">
      <li class="pro-content" v-for="(item, index) in hhh" :key="index">
      <span class="icon-wrapper">
        <span class="icon-content" :class="SelectType === 'pay' ? 'pay' : 'income'">
          <svg class="icon" style="width: 18px;height: 18px">
            <use :xlink:href="'#icon-' + item.category.icon"></use>
          </svg>
        </span>
        <span class="icon-name">{{ item.category.name }}</span>
      </span>
        <span class="radio-wrapper">
        <span class="radio-content">
          <span class="radio-num">
            {{ (item.ratio * 100).toFixed(2) + '%' }}
          </span>
        </span>
        <span class="progress-bar">
          <span class="progress" v-bind:style="{width: (item.ratio * 100).toFixed(2) + '%'}"
                :class="SelectType === 'pay' ? 'pay' : 'income'"></span>
        </span>
      </span>
        <span class="amount">
          ￥{{ formatAmount(item.amount) }}
        </span>
      </li>
    </ul>
    <div class="no-data" v-if="hhh.length === 0">暂无数据</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import clone from '../../libs/clone';
import dayjs from 'dayjs';
import {Record} from '@/interfaces/details';
import {Tags} from '@/interfaces/tags';

@Component
export default class Proportion extends Vue {
  @Prop({default: 'pay'}) readonly SelectType!: string;

  get hhh() {
    if (!this.$store.state.RecordStore.recordList) return;
    const uuu = clone(this.$store.state.RecordStore.recordList as Record[])
        .filter(t => dayjs(t.createdAt).isSame(this.$store.state.RecordStore.staDate, 'month'))
        .filter(t => t.type === this.SelectType);
    type DDD = { icon: string, id: string, name: string, type: string }
    type EEE = { [key: string]: { amount: number, category: DDD, ratio: number } }
    let eee: EEE = {};
    let total = 0;
    uuu.forEach(r => {
      const yyy = r.icon;
      if (!(yyy in eee)) {
        eee[yyy] = {
          amount: 0,
          category: this.$store.state.TagStore.tagList.find((c: Tags) => c.id == yyy),
          ratio: 0.0
        };
      }
      total += r.amount;
      eee[yyy].amount += r.amount;
      eee[yyy].ratio = eee[yyy].amount / total;
    });
    Object.values(eee).forEach(c => c.ratio = c.amount / total);
    return Object.values(eee).sort((a, b) => b.ratio - a.ratio);
  }

  formatAmount(amount: number) {
    console.log(typeof amount);
    if (amount >= 10000) {
      let num = amount / 10000;
      let format = Math.floor(num * 100) / 100;
      return `${format}万`;
    } else {
      return amount.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.pro-wrapper {
  margin-top: 32px;
  list-style: none;
  font-size: 12px;
  overflow-x: scroll;

  .pro-content {
    display: flex;
    margin-bottom: 10px;

    span {
      display: inline-flex;
      align-items: center;
    }

    .icon-content {
      padding: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      .icon {
        fill: white;
      }

      &.pay {
        background: rgb(9, 114, 231);
      }

      &.income {
        background: rgb(240, 183, 57);
      }
    }

    .icon-name {
      margin-left: 5px;
      margin-right: 5px;
      width: 50px;
    }

    .radio-wrapper {
      text-align: right;
      flex-grow: 1;

      .radio-content {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .radio-num {
          color: rgb(144, 147, 153);
          font-size: 10px;
          width: 45px;
          margin-right: 5px;
        }
      }

      .progress-bar {
        position: relative;
        height: 6px;
        width: 100%;
        background: rgb(229, 229, 229);
        border-radius: 16px;

        .progress {
          position: absolute;
          left: 0;
          height: 100%;
          border-radius: 16px;

          &.pay {
            background: rgb(9, 114, 231);
          }

          &.income {
            background: rgb(240, 183, 57);
          }
        }
      }
    }

    .amount {
      width: 56px;
    }
  }
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  text-align: center;
  color: rgb(144, 147, 153);
}
</style>
