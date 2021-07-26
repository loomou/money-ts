<template>
  <div class="remarkTag">
    <header class="remarkHeader">
      <span @click="closeRemarkTag">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </span>
      <span class="title">请添加备注</span>
      <span class="ok" @click="OK">确定</span>
    </header>
    <section class="note">
      <label class="form-item">
        <input type="text"
               placeholder="请输入备注内容"
               maxlength="4"
               v-model="noteContent">
      </label>
      <div style="color: #b5b5b5;margin:5px 26px 0 ">{{ inputNum }}/4</div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class PopupWin extends Vue {
  noteContent: string = '';

  get inputNum() {
    return this.noteContent.length;
  }

  closeRemarkTag() {
    this.$emit('closePopupWin', false);
  }

  OK() {
    this.$store.commit('RecordStore/setNote', this.noteContent);
    this.$emit('closePopupWin', false);
  }
};
</script>

<style lang="scss" scoped>
.remarkTag {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: white;
  border-radius: 10px 10px 0 0;
  z-index: 8;

  .remarkHeader {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    .icon {
      width: 20px;
      height: 20px;
    }

    .title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .ok {
      padding-right: 5px;
      font-size: 16px;
      color: rgb(9, 114, 231);
    }
  }
}

.note {
  padding: 12px 0;

  .form-item {
    font-size: 16px;
    display: flex;
    margin: 0 26px;
    align-items: center;

    input {
      width: 100%;
      flex-grow: 1;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(114, 114, 114, 0.4);
    }

    ::-webkit-input-placeholder {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
