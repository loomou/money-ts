<template>
  <div class="avatar-wrapper">
    <span>头像</span>
    <span class="avatar-item">
          <span class="avatar-img">
            <input type="file"
                   @change="changeImage($event)"
                   accept="image/*"
                   name="avatar"
                   style="position: absolute;opacity: 0"
                   ref="avatarInput">
            <img :src="profile.avatar || defaultAvatar" alt="avatar">
          </span>
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
export default class Avatar extends Vue {
  @Prop({type: Object}) readonly profile!: files;
  defaultAvatar = require('../../assets/img/default-avatar.png');

  changeImage(e: HTMLInputElement) {
    this.$emit('changeImage', e);
  }
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  width: 100%;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin: 5px 0;
  position: relative;

  .avatar-item {
    display: flex;
    align-items: center;

    .avatar-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
  }
}
</style>
