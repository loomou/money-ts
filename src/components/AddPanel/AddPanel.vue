<template>
  <div>
    <div class="panel-wrapper">
      <div class="add-panel">
        {{$store.state.RecordStore.setRecord}}
        <header class="add-header">
          <svg class="icon" @click="closeAddPanel">
            <use xlink:href="#icon-close"></use>
          </svg>
        </header>
        <SelectBar/>
        <Keyboard @ok="closeAddPanel">
          <TypeLists @open="$emit('openAddTag')"/>
          <div @click="showRemarkWin">
            <RemarkBar/>
          </div>
        </Keyboard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SelectBar from "./SelectBar.vue";
  import TypeLists from "./TypeLists.vue";
  import Keyboard from "./Keyboard.vue";
  import RemarkBar from "./RemarkBar.vue";

  @Component({
    components:  {SelectBar, TypeLists, Keyboard, RemarkBar,},
  })
  export default class AddPanel extends Vue{

    closeAddPanel() {
      this.$emit('closeAddPanel', false)
    }

    showRemarkWin() {
      this.$emit('showPopupWin', true)
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
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
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
</style>
