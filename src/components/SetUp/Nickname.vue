<template>
  <div class="user-name">
    <span>昵称</span>
    <span class="name-input">
      <label>
        <input type="text"
               placeholder="请输入昵称"
               class="from-control"
               v-model="displayName"
               @change="changeName()"/>
      </label>
      <svg class="icon">
        <use xlink:href="#icon-right-arrow"></use>
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {files} from '@/interfaces/files';

@Component
export default class Nickname extends Vue {
  @Prop() readonly profile!: files;
  displayName: string | null = this.profile.displayName || null;

  changeName() {
    this.$emit('changeName', this.displayName);
  }
};
</script>

<style lang="scss" scoped>
.user-name {
  width: 100%;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin: 5px 0;
  position: relative;

  .name-input {
    display: flex;
    justify-content: flex-end;
    width: 75%;
    align-items: center;

    input {
      /*width: 80%;*/
      border: none;
      text-align: right;
      display: block;
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
  }
}
</style>
