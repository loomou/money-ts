<template>
  <div>
    <transition name="bottom">
      <div class="panel-wrapper" v-show="isShow">
        <div class="add-panel">
          <header class="add-header">
            <svg class="icon" @click="closeAddPanel">
              <use xlink:href="#icon-close"></use>
            </svg>
          </header>
          <SelectBar @changeType="changeT"/>
          <Keyboard @ok="closeAddPanel">
            <TypeLists @open="changeShow"/>
            <div @click="showRemarkWin">
              <RemarkBar/>
            </div>
          </Keyboard>
        </div>
      </div>
    </transition>
    <transition name="bottom">
      <AddTag :selectType="this.selType" @open="changeShow" v-if="!isShow"/>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import SelectBar from './SelectBar.vue';
import TypeLists from './TypeLists.vue';
import Keyboard from './Keyboard.vue';
import RemarkBar from './RemarkBar.vue';
import AddTag from '@/components/Label/AddTag.vue';

@Component({
  components: {SelectBar, TypeLists, Keyboard, RemarkBar, AddTag},
})
export default class AddPanel extends Vue {
  @Prop({type: String, default: ''}) readonly currentType !: string;
  selType: string = 'pay';
  isShow: Boolean = true;

  created() {
    if (this.currentType.length != 0) {
      this.selType = this.currentType;
    }
  }

  closeAddPanel() {
    this.$emit('closeAddPanel', false);
  }

  showRemarkWin() {
    this.$emit('showPopupWin', true);
  }

  changeShow() {
    this.isShow = !this.isShow;
  }

  changeT(type: any) {
    this.selType = type;
  }
};
</script>

<style lang="scss" scoped>
.add-panel {
  width: 100%;
  border-radius: 8px 8px 0 0;
  background: white;
  overflow: hidden;

  .add-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid rgb(238, 238, 238);
    font-size: 18px;
    background: rgb(250, 250, 250);
    border-radius: 10px 10px 0 0;

    .icon {
      width: 18px;
      height: 18px;
      fill: rgb(96, 98, 102);
    }
  }
}

.bottom-enter-active {
  animation: .3s bottomInUp both ease-out;
}

.bottom-leave-active {
  animation: .3s bottomOutDown both ease-in;
}

@keyframes bottomInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translateZ(0);
  }
}

@keyframes bottomOutDown {
  0% {
    transform: translateZ(0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
