<template>
  <div class="my-header">
    <div class="wrapper">
      <router-link to="/setup">
        <div class="avatar">
          <img :src="info.avatar || defaultAvatar" alt="avatar">
        </div>
        <div class="my-name">
          {{ this.info.displayName || '请完善你的信息' }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {files} from '@/interfaces/files';

@Component
export default class MyInf extends Vue {
  @Prop() readonly info!: files;
  defaultAvatar = require('../../assets/img/default-avatar.png');
};
</script>

<style lang="scss" scoped>
.my-header {
  width: 100%;
  padding: 20px 0;
  background: rgb(9, 114, 231);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  .wrapper {
    width: 100%;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .my-name {
    text-align: center;
    margin-top: 5px;
    color: #f5f5f5;
  }
}
</style>
