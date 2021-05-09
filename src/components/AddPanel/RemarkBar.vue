<template>
  <section class="note">
    <div>
      <label class="form-item">
        <span class="name">备注</span>
        <span class="add-remark">{{notes ? notes : '点击这里添加备注' }}</span>
      </label>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class RemarkBar extends Vue {
    note: string = this.notes;

    get notes() {
      return this.$store.state.RecordStore.setRecord.note;
    }

  };
</script>

<style lang="scss" scoped>
  .note {
    padding: 12px 0;

    .form-item {
      font-size: 14px;
      display: flex;
      padding-left: 26px;
      align-items: center;

      .name {
        padding-right: 16px;
        color: rgb(87, 111, 150);
      }

      .add-remark {
        height: 40px;
        padding: 0 15px 0 0;
        flex-grow: 1;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
