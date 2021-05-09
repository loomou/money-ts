<template>
  <div>
    <ul class="detailed-container">
      <li class="detailed-months" v-for="(group, index) in xxx" :key="index">
        <div class="detailed-month-total" v-if="isSameMonth(group.title)">
          <span class="detailed-month">{{beautify2(group.title)}}</span>
          <svg class="icon icon-vertical">
            <use xlink:href="#icon-vertical"></use>
          </svg>
          <span class="detailed-month-pay">总支出￥{{ttt(group.title,'month','pay').toFixed(2)}}</span>
          <span class="detailed-month-income">总收入￥{{ttt(group.title,'month','income').toFixed(2)}}</span>
        </div>
        <ul class="month-detailed" v-for="(group2, index) in group.items" :key="index">
          <li class="date-header">
            <section class="month-date-week">
              <span class="month-date">
                {{beautify(group2.title)}}
              </span>
              <span>
                {{beautify3(group2.title)}}
              </span>
            </section>
            <section class="date-pay-income">
              <span class="date-pi">支</span>
              <span class="date-pay-total">{{ttt(group2.title, 'date', 'pay').toFixed(2)}}</span>
              <span class="date-pi">收</span>
              <span>{{ttt(group2.title, 'date', 'income').toFixed(2)}}</span>
            </section>
          </li>
          <li class="date-detailed" v-for="(group3, index) in group2.items" :key="index">
            <router-link class="date-pay" href="#" :to="`/detailed/edit/${group3.id}`">
              <span class="date-pay-icon" :class="group3.type === 'pay' ? 'selected-pay' : 'selected-income'">
                <svg class="icon" style="width: 40px; height: 40px">
                  <use :xlink:href="'#icon-'+ findIcon(group3.icon).icon"></use>
                </svg>
              </span>
              <div class="record-content">
                <div>{{findIcon(group3.icon).name}}</div>
                <div class="record-content-details">
                  <span>{{getTime(group3.createdAt)}}</span>
                  <svg class="icon icon-vertical" v-if="!!group3.note">
                    <use xlink:href="#icon-vertical"></use>
                  </svg>
                  <span>{{group3.note}}</span>
                </div>
              </div>
              <div class="record-content-amount">
                {{group3.type === 'pay' ? '-' : '+'}}{{beautify4(group3.amount)}}
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import clone from '../../libs/clone';
  import {Record} from '@/interfaces/details';
  import {Tags} from '@/interfaces/tags';

  @Component
  export default class RecordList extends Vue {
    type: string = 'pay';

    beforeCreate() {
      this.$store.commit('TagStore/fetchTags');
    }

    get xxx() {
      return this.$store.getters['RecordSortStore/monthSort'];
    }

    get zzz() {
      return this.$store.state.RecordStore.recordList;
    }

    isSameMonth(dateTime: string | Date) {
      return !dayjs(dateTime).isSame((new Date()), 'month');
    }

    beautify(string: string | Date) {
      return dayjs(string).format('M月D日');
    }

    beautify2(string: string | Date) {
      return dayjs(string).format('YYYY年M月');
    }

    beautify3(num: string | Date) {
      let week = '';
      switch (new Date(num).getDay()) {
        case 0:
          week = '星期天';
          break;
        case 1:
          week = '星期一';
          break;
        case 2:
          week = '星期二';
          break;
        case 3:
          week = '星期三';
          break;
        case 4:
          week = '星期四';
          break;
        case 5:
          week = '星期五';
          break;
        case 6:
          week = '星期六';
      }
      return week;
    }

    beautify4(num: number) {
      return num.toFixed(2);
    }

    getTime(time: string | Date) {
      return dayjs(time).format('HH:mm');
    }

    ttt(date: string | Date, filterDate: any, type: string) {
      const bbb = clone(this.zzz).filter((t: Record) => dayjs(t.createdAt).isSame(dayjs(date), filterDate)).filter((y: Record) => y.type === type);
      return bbb.reduce((a: number, b: Record) => {
        return a + b.amount;
      }, 0);
    }

    findIcon(icon: string) {
      const def = clone(this.$store.state.TagStore.tagList);
      return def.filter((t: Tags) => t.id === icon)[0];
    }
  };
</script>

<style lang="scss" scoped>
  .detailed-container {
    padding: 8px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    overflow: auto;

    .detailed-month-total {
      padding: 1px 20px 8px;
      font-size: 12px;
      color: rgb(144, 147, 153);
    }

    .detailed-month-pay {
      margin-right: 12px;
    }

    .vertical {
      border-right: 1px solid rgb(238, 238, 238);
      margin: 0 8px;
      border-top-color: rgb(238, 238, 238);
      border-bottom-color: rgb(238, 238, 238);
      border-left-color: rgb(238, 238, 238);
    }

    .month-detailed {
      border-radius: 8px;
      margin-bottom: 8px;
      background: white;
      color: rgb(48, 49, 51);
      overflow: hidden;

      .date-header {
        padding: 22px 18px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        font-size: 14px;
        align-items: center;
        background: rgb(251, 251, 251);

        .month-date {
          margin-right: 8px;
        }

        .date-pay-income {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          color: rgb(96, 98, 102);

          .date-pi {
            width: 1.5em;
            height: 1.5em;
            display: inline-flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            margin: 4px;
            background: rgb(244, 244, 244);
            color: rgb(144, 147, 153);
            border-radius: 4px;
            font-size: 12px !important;
          }

          .date-pay-total {
            margin-right: 16px;
          }
        }
      }

      .date-pay {
        padding: 22px 18px;
        display: flex;
        color: rgb(96, 98, 102);
        text-decoration: none;
        font-size: 14px;

        .date-pay-icon {
          width: 40px;
          height: 40px;
          padding: 8px;
          display: inline-flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          border-radius: 50%;

          &.selected-pay {
            border: 1px solid rgb(9, 114, 231);
            background: rgb(9, 114, 231);
            color: rgb(241, 241, 241);
          }

          &.selected-income {
            border: 1px solid rgb(240, 183, 57);
            background: rgb(240, 183, 57);
            color: rgb(241, 241, 241);
          }
        }

        .record-content {
          -webkit-box-flex: 1;
          flex-grow: 1;
          padding: 0 20px 0 12px;
        }

        .record-content-details {
          color: rgb(192, 196, 204);
        }

        .record-content-amount {
          font-size: 14px;
        }
      }
    }
  }
</style>
