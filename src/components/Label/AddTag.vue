<template>
  <div class="add-win">
    <div class="win-title">
      请添加类别名
    </div>
    <div class="win-input">
      <label>
        <input type="text"
               placeholder="不能与已有类型名重复"
               maxlength="4"
               @input="inputNum($event.target.value)">
      </label>
      <div style="color: #b5b5b5;margin-top: 5px">{{num}}/4</div>
    </div>
    <div class="btn">
      <button @click="emitClose">取消</button>
      <button @click="addType">确认</button>
    </div>
    <div class="tip" v-if="showWarn">
      <div class="warning">{{warnContent}}</div>
    </div>
    <div class="tip-mass" v-if="showMask"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {Tags} from '@/interfaces/tags';

  @Component
  export default class AddTag extends Vue {
    @Prop({type: String, default: 'pay', required: true}) readonly selType!: string;
    num: number = 0;
    inputContent: String = '';
    showWarn: boolean = false;
    showMask: boolean = false;
    warnContent: string = '';

    created() {
      this.$store.commit('TagStore/fetchTags');
    }

    emitClose() {
      this.$emit('emitClose');
    }

    addType() {
      if (this.inputContent.length === 0) {
        this.warnContent = '类型名不能空';
        this.showWarn = this.showMask = true;
        setTimeout(() => {
          this.showWarn = this.showMask = false;
        }, 1000);
        return;
      }
      const names = this.$store.state.TagStore.tagList.map((item: Tags) => item.name);
      if (names.indexOf(this.inputContent) >= 0) {
        this.warnContent = '类型名已存在';
        this.showWarn = this.showMask = true;
        setTimeout(() => {
          this.showWarn = this.showMask = false;
        }, 1000);
        return;
      }
      this.$store.commit('TagStore/createTag', {name: this.inputContent, type: this.selType});
      this.$emit('emitClose');
    }

    inputNum(e: string) {
      this.inputContent = e;
      this.num = e.length;
    }
  }
</script>

<style lang="scss" scoped>
  .add-win {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 5;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
    border-radius: 16px 16px 0 0;

    .win-title {
      padding: 15px;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
    }

    .win-input {
      margin: 10px 25px 10px 25px;

      input {
        width: 100%;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid rgba(114, 114, 114, 0.4);
      }

      ::-webkit-input-placeholder {
        color: #999;
        font-size: 14px;
      }
    }

    .btn {
      display: flex;
      overflow: hidden;

      button {
        flex: 1;
        height: 48px;
        margin: 0;
        border: 0;
        background-color: #fff;
      }

      button:active {
        background: rgba(102, 102, 102, 0.07);
      }

      :last-child {
        color: rgb(9, 114, 231);
      }
    }
  }

  .tip {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    z-index: 6;

    .warning {
      padding: 15px;
      color: white;
    }
  }

  .tip-mass {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
  }
</style>
