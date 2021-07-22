<template>
  <div>
    <section class="output-bar">
      <span>￥</span>
      <span class="output">{{ output }}</span>
    </section>
    <slot></slot>
    <section class="keyboard-wrapper">
      <div class="keyboard">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">DEL</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">AC</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button class="OK" :class="type === 'income' && 'selected-income'" @click="ok">OK</button>
        <button class="zero" @click="inputContent">0</button>
        <button @click="inputContent">.</button>
      </div>
    </section>
    <div class="tip" v-if="show">
      <div class="icons">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ok"></use>
        </svg>
      </div>
      <div class="content">
        {{ content }}
      </div>
    </div>
    <div class="tip" v-if="showWarn">
      <div class="warning">输入金额不能大于1,000,000</div>
    </div>
    <div class="tip-mass" v-if="showMask"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Keyboard extends Vue {
  output: string = '0';
  show: boolean = false;
  content: string = '';
  showWarn: boolean = false;
  showMask: boolean = false;

  mounted() {
    if (this.$route.params.id) {
      this.output = this.$store.state.RecordStore.currentList.amount.toString();
    }
  }

  get type() {
    return this.$store.state.TypeStore.typePick;
  }

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    if (this.output.indexOf('.') >= 0 && this.output.length - 1 - this.output.indexOf('.') >= 2) {
      return;
    }
    if (this.output.length === 6 && input !== '.' && this.output.indexOf('.') < 0) {
      this.showWarn = this.showMask = true;
      setTimeout(() => {
        this.showWarn = this.showMask = false;
      }, 1000);
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    const num = parseFloat(this.output);
    if (num === 0) {
      return;
    }
    if (this.$route.params.id) {
      this.$store.commit('RecordStore/setAmount', num);
      this.$store.commit('RecordStore/updateRecord', this.$store.state.RecordStore.setRecord);
      this.content = '修改成功';
    } else {
      this.$store.commit('RecordStore/setAmount', num);
      this.$store.commit('RecordStore/createRecord', this.$store.state.RecordStore.setRecord);
      this.$store.commit('RecordStore/modifyCurrentRecord');
      this.content = '添加成功';
    }
    this.output = '0';
    this.show = this.showMask = true;
    setTimeout(() => {
      this.show = this.showMask = false;
      setTimeout(() => {
        this.$emit('ok');
      }, 100);
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
.keyboard-wrapper {
  padding: 4px;
  background: rgb(250, 250, 250);

  .keyboard {
    button {
      width: 25%;
      height: 64px;
      float: left;
      background: white;
      font-size: 1.3em;
      outline: none;
      border-radius: 4px;
      border: 4px solid rgb(250, 250, 250);
    }

    .OK {
      height: 128px;
      float: right;
      color: white;
      background: rgb(9, 114, 231);

      &.selected-income {
        background: rgb(240, 183, 57);
      }
    }

    .zero {
      width: 50%;
    }
  }
}

.output-bar {
  display: flex;
  width: 90%;
  margin: 10px auto;
  border-bottom: 1px solid rgb(238, 238, 238);
  font-size: 3em;

  .output {
    padding-left: 8px;
    flex-grow: 1;
    border: none;
    outline: none;
    text-align: right;
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
  z-index: 4;

  .icons {
    display: flex;
    width: 120px;
    height: 80px;
    align-items: center;
    justify-content: center;
  }

  .content {
    height: 40px;
    text-align: center;
    color: white;
    font-size: 16px;
  }
}

.warning {
  word-break: keep-all;
  padding: 15px;
  color: white;
}

.icon {
  width: 40px;
  height: 40px;
  fill: currentColor;
  overflow: hidden;
}

.tip-mass {
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
