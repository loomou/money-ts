<template>
  <div>
    <section class="month-total">
      <div class="month-select" @click="showPopup">
        <span>{{year}}</span>
        <svg class="icon">
          <use xlink:href="#icon-vertical"></use>
        </svg>
        <svg class="icon icon-arrow">
          <use xlink:href="#icon-down-arrow"></use>
        </svg>
      </div>
      <div class="total-pay">共支出</div>
      <div class="pay-account">
        <span>￥</span>
        <span class="money">{{filterMonthRecord.bbb.toFixed(2)}}</span>
      </div>
      <div class="income-account">
        <span>共收入￥</span>
        <span>{{filterMonthRecord.ccc.toFixed(2)}}</span>
      </div>
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
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import clone from "../../libs/clone.ts";

  export default {
    name: "MonthTotal",

    data() {
      return {
        timeValue: '请选择时间',
        show: false,
        currentDate: new Date(),
        minDate: new Date(2010, 1, 1),
        maxDate: new Date(),
        year: dayjs(new Date()).format('YYYY年M月'),
      };
    },

    computed: {
      filterMonthRecord() {
        const aaa = clone(this.$store.state.RecordStore.recordList).filter(t => dayjs(t.createdAt).isSame(this.$store.state.RecordStore.staDate, 'month'));
        const bbb = aaa.filter(t => t.type === 'pay').reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
        const ccc = aaa.filter(t => t.type === 'income').reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
        return {bbb, ccc};
      },
    },

    methods: {
      showPopup() {
        this.show = true;
      },

      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },

      confirmPicker(val) {
        this.year = dayjs(val).format('YYYY年M月');
        if (dayjs(val).isSame((new Date()), 'month')) {
          this.$store.state.RecordStore.staDate = new Date();
        } else {
          this.$store.state.RecordStore.staDate = dayjs(val).endOf('month');
        }
        this.show = false;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .month-total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 0;
    text-align: center;
    background: white;

    .month-select {
      width: auto;
      padding: 8px 16px;
      background: rgb(247, 247, 247);
      border-radius: 4px;
      color: rgb(96, 98, 102);
      font-size: 14px;

      .icon-arrow {
        width: 12px;
      }
    }

    .total-pay {
      margin: 20px 0 4px;
      color: rgb(9, 114, 231);
    }

    .pay-account {
      display: flex;
      align-items: flex-start;
      -webkit-box-pack: center;
      justify-content: center;
      font-weight: 500;
      font-size: 22px;
      color: rgb(9, 114, 231);
    }

    .income-account {
      color: rgb(144, 147, 153);
      font-size: 14px;
    }
  }
</style>
