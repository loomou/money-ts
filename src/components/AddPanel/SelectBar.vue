<template>
  <div class="select-bar">
    <ul class="pi-box">
      <li :class="this.typeClass === 'pay' && 'selected-pay'"
          @click="selectType ('pay')"
          class="select">
        支出
      </li>
      <li :class="this.typeClass === 'income' && 'selected-income'"
          @click="selectType ('income')"
          class="select">
        收入
      </li>
    </ul>
    <span class="date-picker" @click="showPopup">
      <span class="detailed-month">{{year}}</span>
      <svg class="icon icon-down-arrow">
        <use xlink:href="#icon-down-arrow"></use>
      </svg>
    </span>
    <van-popup v-model="show" position="bottom">
      <div class="date-wrapper">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
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

  export default {
    name: "SelectBar",

    data() {
      return {
        show: false,
        currentDate: new Date(),
        minDate: new Date(2010, 1, 1),
        maxDate: new Date(),
        year: dayjs().format('M月D日'),
        typeClass: 'pay'
      };
    },

    mounted() {
      if (this.$route.params.id) {
        this.currentDate = new Date(this.$store.state.RecordStore.currentList.createdAt);
        this.year = dayjs(this.$store.state.RecordStore.currentList.createdAt).format('M月D日');
        this.typeClass = this.$store.state.RecordStore.currentList.type
        this.$store.commit('TypeStore/setTypeVal', this.$store.state.RecordStore.currentList.type)
      } else {
        this.$store.commit('TypeStore/setTypeVal', this.typeClass)
      }
      // this.$store.state.TypeStore.typePick = this.value;
    },

    computed: {},

    methods: {

      showPopup() {
        this.show = true;
      },

      confirmPicker(val) {
        let datePick = val.toISOString();
        this.year = dayjs(val).format('M月D日');
        this.show = false;
        if (dayjs(val).isSame(new Date(), 'date')) {
          datePick = new Date().toISOString();
        }
        this.$store.commit('RecordStore/setDate', datePick)
        // this.$store.state.RecordStore.setRecord.createdAt = datePick;
        // this.$emit('update:date', datePick);
      },

      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        } else if (type === 'day') {
          return `${val}日`;
        }
        return val;
      },

      selectType(type) {
        if (type !== 'pay' && type !== 'income') {
          throw new Error('type is unknown ');
        }
        this.$store.commit('RecordStore/setType', type)
        this.$emit('update:value', type);
        if (type === 'pay') {
          this.$store.commit('RecordStore/setIcon', '-1')
        } else {
          this.$store.commit('RecordStore/setIcon', '-12')
        }
        this.typeClass = type;
        this.$store.commit('TypeStore/typeOption', type);
      },

    }
  };
</script>

<style lang="scss" scoped>
  .select-bar {
    padding: 16px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    .select {
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 4px 12px;
      outline: none;
      border-radius: 16px;
      margin-right: 8px;
      border: 1px solid rgb(241, 241, 241);
      background: rgb(241, 241, 241);
      font-size: 12px;
      color: rgb(144, 147, 153);

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

    .date-picker {
      position: absolute;
      right: 16px;
      padding: 2px 6px;
      border-radius: 14px;
      background: rgba(198, 198, 198, 0.4);
      font-size: 12px;

      .icon-down-arrow {
        width: 10px;
      }
    }
  }
</style>
