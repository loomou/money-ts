<template>
  <div class="wrapper">
    <header class="title-bar">
      <router-link to="/my">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </router-link>
      <span class="information">
          个人信息
        </span>
    </header>
    <div class="content">
      <Avatar @changeImage="changeImage" :profile.sync="profile"/>
      <Nickname @changeName="changeName" :profile.sync="profile"/>
      <Gender @changeGender="changeGender" :profile.sync="profile"/>
      <div class="save" @click="saveProfile">
        保存
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Avatar from '@/components/SetUp/Avatar.vue';
  import Nickname from '@/components/SetUp/Nickname.vue';
  import Gender from '@/components/SetUp/Gender.vue';

  @Component({
    components: {Avatar, Nickname, Gender}
  })
  export default class SetUp extends Vue {

    created() {
      this.$store.commit('FileStore/fetchProfile');
    }

    get profile() {
      return this.$store.state.FileStore.profile;
    }

    changeImage(e: any) {
      const accepts = ['image/gif', 'image/jpeg', 'image/png'];
      const files = e.target;
      if (!files) {
        return;
      }
      const file = files.files[0];
      if (!file) {
        return;
      }
      if (!accepts.includes(file.type)) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    }

    changeName(name: string) {
      if (name.length < 0) {
        return;
      }
      this.profile.displayName = name;
    }

    changeGender(gender: string) {
      this.profile.gender = gender;
    }

    saveProfile() {
      this.$store.commit('FileStore/saveProfile', this.profile);
      alert('保存成功');
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .title-bar {
    width: 100%;
    height: 50px;
    background: rgb(9, 114, 231);
    top: 0;
    left: 0;
    text-align: center;
    line-height: 49px;
    font-size: 18px;
    color: #fff;
    z-index: 100000;

    .icon {
      position: absolute;
      color: #fff;
      top: 13.5px;
      left: 20px;
    }
  }

  .content {
    overflow: auto;
    flex-grow: 1;
    background: rgb(236, 236, 236);
    font-size: 14px;

    .save {
      width: 90%;
      background: rgb(9, 114, 231);
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      margin: 50px auto 0;
    }
  }
</style>
