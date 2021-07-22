<template>
  <div>
    <div class="title">
      <span>{{this.title}}</span>
      <span>
        <button class="btn btn-pay"
                @click="typeSel('pay')"
                :class="this.selType === 'pay' && 'selected-pay'">
          支出
        </button>
        <button class="btn btn-income"
                @click="typeSel('income')"
                :class="this.selType === 'income' && 'selected-income'">
          收入
        </button>
      </span>
    </div>
    <Proportion :SelectType="this.selType"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Proportion from './Proportion.vue';

  @Component({
    components: {Proportion}
  })
  export default class Consist extends Vue {
    @Prop() readonly title!: string;
    selType: string = 'pay';

    get recordList() {
      return this.$store.state.RecordStore.recordList;
    }

    typeSel(type: string) {
      if (type !== 'pay' && type !== 'income') {
        throw new Error('type is unknown ');
      }
      this.selType = type;
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 8px;
      outline: none;
      border-radius: 16px;
      border: 1px solid rgb(241, 241, 241);
      background: rgb(241, 241, 241);
      color: rgb(144, 147, 153);
      font-size: 12px;

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

    .btn-pay {
      margin-right: 8px;
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
